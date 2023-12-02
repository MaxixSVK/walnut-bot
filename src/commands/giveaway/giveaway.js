const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Create a giveaway or configure an existing one')
        .addSubcommand(command => command
            .setName('start')
            .setDescription('Starts a giveaway')
            .addStringOption(option => option
                .setName('duration')
                .setDescription('The duration of the giveaway (ie. 1m, 1h, 1d, etc)')
                .setRequired(true))
            .addIntegerOption(option => option
                .setName('winners')
                .setDescription('The number of the giveaway winners')
                .setRequired(true))
            .addStringOption(option => option
                .setName('prize')
                .setDescription('What the winners will win')
                .setRequired(true))
            .addChannelOption(option => option
                .setName('channel')
                .setDescription('The channel the giveaway should happen in')
                .setRequired(true))
            .addStringOption(option => option
                .setName('content')
                .setDescription('Content for giveway embed')
                .setRequired(true)))
        .addSubcommand(command => command
            .setName('edit')
            .setDescription('Edit a giveaway')
            .addStringOption(option => option
                .setName('message-id')
                .setDescription('The id of the giveaway message')
                .setRequired(true))
            .addStringOption(option => option
                .setName('time')
                .setDescription('The added duration of the giveaway in MS')
                .setRequired(true))
            .addIntegerOption(option => option
                .setName('prize')
                .setDescription('The new prize of the giveaway')
                .setRequired(true)))
        .addSubcommand(command => command
            .setName('end')
            .setDescription('End an existing giveaway')
            .addStringOption(option => option
                .setName('message-id')
                .setDescription('The id of the giveaway message')
                .setRequired(true)))
        .addSubcommand(command => command
            .setName('reroll')
            .setDescription('Reroll a giveaway')
            .addStringOption(option => option
                .setName('message-id')
                .setDescription('The id of the giveaway message')
                .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),
    async execute(interaction, client) {

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'start':

                await interaction.reply({ content: 'Starting your giveaway...', ephemeral: true })

                const duration = ms(interaction.options.getString('duration') || '');
                const winnerCount = interaction.options.getInteger('winners');
                const prize = interaction.options.getString('prize');
                const contentmain = interaction.options.getString('content');
                const channel = interaction.options.getChannel('channel')

                client.giveawayManager.start(channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: true,
                        content: contentmain,
                        treshold: 60000000000_000,
                        embedColor: '#0000ff'
                    }
                });

                interaction.editReply({ content: `Your giveaway has been created in ${channel}`, ephemeral: true })

                break;
        }
    }
}