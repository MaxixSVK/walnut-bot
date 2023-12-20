const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config-setup')
        .setDescription('Setup configuration of the bot (channels and roles)')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option
            .setName('rules-and-info-channel')
            .setDescription('The main channel with server info, verification etc')
            .setRequired(true))
        .addChannelOption(option => option
            .setName('welcome-channel')
            .setDescription('The welcome channel')
            .setRequired(true))
        .addChannelOption(option => option
            .setName('transcript-channel')
            .setDescription('The transcript channel for tickets')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('staff-role')
            .setDescription('The role for staff members')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('unverified-role')
            .setDescription('The role for unverified users')
            .setRequired(true))
            .addBooleanOption(option => option
                .setName('disable-nsfw')
                .setDescription('Disable NSFW results')
                .setRequired(true)),
    async execute(interaction) {
        const ids = [
            {
                name: 'mainChannelId',
                type: 'getChannel',
                commandOption: 'rules-and-info-channel'
            },
            {
                name: 'welcomeChannelId',
                type: 'getChannel',
                commandOption: 'welcome-channel'
            },
            {
                name: 'transcriptChannelId',
                type: 'getChannel',
                commandOption: 'transcript-channel'
            },
            {
                name: 'staffRoleId',
                type: 'getRole',
                commandOption: 'staff-role'
            },
            {
                name: 'unverifiedRoleId',
                type: 'getRole',
                commandOption: 'unverified-role'
            }
        ];

        const disableNSFW = interaction.options.getBoolean('disable-nsfw');

        const configSchema = interaction.client.configSchema;
        const guildId = interaction.guild.id;

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (configSchemaData.length) {
            await configSchema.deleteMany({ guildId: guildId });
        }

        const idObject = {};

        for (let i = 0; i < ids.length; i++) {
            ids[i].id = interaction.options[ids[i].type](ids[i].commandOption).id;
            idObject[ids[i].name] = ids[i].id;
        }

        await configSchema.create({
            guildId: guildId,
            disableNsfw: disableNSFW,
            ...idObject
        });

        const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Setup completed')
            .setDescription('Setup completed successfully, database updated')

        interaction.reply({ embeds: [setupEmbed], ephemeral: true });
    }
};
