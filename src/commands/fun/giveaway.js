const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js');
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
                .setName('winners')
                .setDescription('The updated number of winners for the giveaway')
                .setRequired(true))
            .addStringOption(option => option
                .setName('prize')
                .setDescription('The new prize of the giveaway')
                .setRequired(false)))
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
    async execute(interaction) {

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'start':

                await interaction.reply({ content: 'Starting your giveaway...', ephemeral: true })

                const duration = ms(interaction.options.getString('duration') || '');
                const winnerCount = interaction.options.getInteger('winners');
                const prize = interaction.options.getString('prize');
                const channel = interaction.options.getChannel('channel')

                const permissions = channel.permissionsFor(interaction.client.user);
                if (!permissions.has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel])) {
                    const errorEmbed = new EmbedBuilder()   
                        .setColor('Red')
                        .setTitle('Error')
                        .setDescription('I do not have propper permission in this channel\nPlease make sure I have permission to send messages and view this channel')
                    return interaction.editReply({ content: '', embeds: [errorEmbed], ephemeral: true });
                }

                interaction.client.giveawayManager.start(channel, {
                    prize,
                    winnerCount,
                    duration,
                    hostedBy: interaction.user,
                    lastChance: {
                        enabled: true,
                        treshold: 60000000000_000,
                        embedColor: '#0000ff'
                    }
                }).then(() => {
                    interaction.editReply({ content: `Your giveaway has been created in ${channel}`, ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: 'There was an error while executing this command', ephemeral: true });
                })

                break;
            case 'edit':

                await interaction.reply({ content: 'Editing your giveaway...', ephemeral: true })

                const newDuration = ms(interaction.options.getString('time'));
                const newWinnerCount = interaction.options.getInteger('winners');
                const newPrize = interaction.options.getString('prize');
                const messageiD = interaction.options.getString('message-id')

                interaction.client.giveawayManager.edit(messageiD, {
                    addTime: ms(newDuration),
                    newWinnerCount: newWinnerCount,
                    newPrize: newPrize
                }).then(() => {
                    interaction.editReply({ content: 'Your giveaway has been edited', ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: 'There was an error while executing this command', ephemeral: true });
                })

                break
            case 'end':

                await interaction.reply({ content: 'Ending your giveaway...', ephemeral: true })

                const messageId1 = interaction.options.getString('message-id');

                interaction.client.giveawayManager.end(messageId1).then(() => {
                    interaction.editReply({ content: 'Your giveaway has been ended', ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: 'There was an error while executing this command', ephemeral: true });
                })

                break
            case 'reroll':

                await interaction.reply({ content: 'Rerolling your giveaway...', ephemeral: true })

                const query = interaction.options.getString('message-id');
                const giveaway = interaction.client.giveawayManager.giveaways.find((g) => g.guildId === interaction.guildId && g.prize === query) || interaction.client.giveawayManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === query)

                if (!giveaway) return interaction.editReply({ content: 'Couldn\'n find a giveaway with provided message ID', ephemeral: true });
                const messageId2 = interaction.options.getString('message-id');
                interaction.client.giveawayManager.reroll(messageId2).then(() => {
                    interaction.editReply({ content: 'Your giveaway has been rerolled', ephemeral: true });
                }).catch(err => {
                    interaction.editReply({ content: 'There was an error while executing this command', ephemeral: true });
                })
        }
    }
}