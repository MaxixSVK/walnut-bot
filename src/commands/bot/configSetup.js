const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
        const mainChannelId = interaction.options.getChannel('main-channel').id;
        const welcomeChannelId = interaction.options.getChannel('welcome-channel').id;
        const transcriptChannelId = interaction.options.getChannel('transcript-channel').id;
        const staffRoleId = interaction.options.getRole('staff-role').id;
        const unverifiedRoleId = interaction.options.getRole('unverified-role').id;

        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

        const data = await configSchema.find({
            guildId: guildId
        });

        if (!data.length == 0) {
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

        interaction.reply({ content: 'Setup has been completed', ephemeral: true })
    }
}
