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
            .setRequired(true)),
    async execute(interaction) {
        function getId(type, name) {
            return interaction.options[type](name).id;
        }

        const mainChannelId = getId('getChannel', 'rules-and-info-channel');
        const welcomeChannelId = getId('getChannel', 'welcome-channel');
        const transcriptChannelId = getId('getChannel', 'transcript-channel');
        const staffRoleId = getId('getRole', 'staff-role');
        const unverifiedRoleId = getId('getRole', 'unverified-role');

        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData.length == 0) {
            await configSchema.deleteMany({ guildId: guildId });
        }
        await configSchema.create({
            guildId: guildId,
            mainChannelId: mainChannelId,
            welcomeChannelId: welcomeChannelId,
            transcriptChannelId: transcriptChannelId,
            staffRoleId: staffRoleId,
            unverifiedRoleId: unverifiedRoleId
        });

        const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Setup completed')
            .setDescription('Setup completed successfully, database updated')

        interaction.reply({ embeds: [setupEmbed], ephemeral: true })
    }
}
