const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config-setup')
        .setDescription('Setup configuration of the bot (channels and roles)')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
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
        .addChannelOption(option => option
            .setName('ticket-log-channel')
            .setDescription('The log channel for tickets')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('staff-role')
            .setDescription('The role for staff members')
            .setRequired(true))
        .addBooleanOption(option => option
            .setName('disable-nsfw')
            .setDescription('Disable NSFW results')
            .setRequired(true))
        .addStringOption(option => option
            .setName('color')
            .setDescription('The color of the embeds, Please provide a valid hex color (e.g. #FF0000)')
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
                name: 'ticketLogChannelId',
                type: 'getChannel',
                commandOption: 'ticket-log-channel'
            },
            {
                name: 'staffRoleId',
                type: 'getRole',
                commandOption: 'staff-role'
            }
        ];

        const disableNSFW = interaction.options.getBoolean('disable-nsfw');
        const color = interaction.options.getString('color');

        const isHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
        if (!isHexColor) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Invalid hex code')
                .setDescription('Invalid hex code. Please provide a valid hex code.');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

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
            color: color,
            ...idObject
        });

        const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Setup completed')
            .setDescription('Setup completed successfully, database updated')

        interaction.reply({ embeds: [setupEmbed], ephemeral: true });
    }
};
