const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData.length) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription('Config setup has not been completed, please contact server administrator')

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const staffRoleId = configSchemaData.map(item => item.staffRoleId).toString()
        const guild = interaction.guild;
        const member = guild.members.cache.get(interaction.user.id);

        if (!member.roles.cache.has(staffRoleId)) {
            const permsEmbed = new EmbedBuilder()
                .setTitle('No permissions')
                .setDescription('You don\'t have permission to close this ticket')
                .setColor('Red')

            return interaction.reply({ embeds: [permsEmbed], ephemeral: true })
        }

        const closeEmbed = new EmbedBuilder()
            .setTitle('Do you want to close this ticket?')
            .setDescription('Please confirm that you want to close this ticket.')
            .setColor('Red')

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('closeTicket')
                    .setLabel('Close Ticket')
                    .setEmoji('✅')
                    .setStyle(ButtonStyle.Danger),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cancelCloseTicket')
                    .setLabel('Cancel')
                    .setEmoji('❌')
                    .setStyle(ButtonStyle.Secondary),
            )

        await interaction.reply({ embeds: [closeEmbed], components: [buttons], ephemeral: true})
    }
}