const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('advanced-setup')
        .setDescription('just a setup command')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option
            .setName('main-channel')
            .setDescription('The main channel with server info, verification etc')
            .setRequired(true))
        .addChannelOption(option => option
            .setName('welcome-channel')
            .setDescription('The welcome channel, that\'s all')
            .setRequired(true))
        .addChannelOption(option => option
            .setName('transcript-channel')
            .setDescription('The transcript channel for tickets')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('staff-role')
            .setDescription('The id of staff role')
            .setRequired(true))
        .addRoleOption(option => option
            .setName('unverified-role')
            .setDescription('The id of unverified role')
            .setRequired(true)),
    async execute(interaction) {
        const mainChannelId = interaction.options.getChannel('main-channel');
        const welcomeChannelId = interaction.options.getChannel('welcome-channel');
        const transcriptChannelId = interaction.options.getChannel('transcript-channel');
        const staffRoleId = interaction.options.getRole('staff-role');
        const unverifiedRoleId = interaction.options.getRole('unverified-role');

        const guildId = interaction.guild.id
        const configSchema = interaction.client.configSchema

        const data = await configSchema.find({
            guildId: guildId
        });

        if (!data.length == 0) {
            await configSchema.deleteMany({ guildId: guildId })
            await configSchema.create({
                guildId: guildId,
                mainChannelId: mainChannelId.id,
                welcomeChannelId: welcomeChannelId.id,
                transcriptChannelId: transcriptChannelId.id,
                staffRoleId: staffRoleId.id,
                unverifiedRoleId: unverifiedRoleId.id
            });
        }
        else {
            await configSchema.create({
                guildId: guildId,
                mainChannelId: mainChannelId.id,
                welcomeChannelId: welcomeChannelId.id,
                transcriptChannelId: transcriptChannelId.id,
                staffRoleId: staffRoleId.id,
                unverifiedRoleId: unverifiedRoleId.id
            });
        }

        interaction.reply({ content: 'Setup has been completed', ephemeral: true })
    }
}
