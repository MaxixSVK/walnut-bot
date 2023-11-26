const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === "closeTicket") {

            const guild = interaction.guild;
            const member = guild.members.cache.get(interaction.user.id);
            const role = guild.roles.cache.find(role => role.name === config.StaffRole);

            if (member.roles.cache.has(role.id)) {

                interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: role.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ]);
                const deleteEmbed = new EmbedBuilder()
                    .setTitle("Ticket has been closed")
                    .setDescription("Now only staff team can see this ticket")
                    .setColor("Red")

                const deleteButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('deleteTicket')
                            .setLabel('Delete Ticket')
                            .setEmoji('❌')
                            .setStyle(ButtonStyle.Danger),
                    )

                await interaction.reply({ embeds: [deleteEmbed], components: [deleteButton], ephemeral: true })
            }
            else {
                const permsEmbed = new EmbedBuilder()
                    .setTitle("No permissions")
                    .setDescription("You don't have permission to close this ticket")
                    .setColor("Red")

                await interaction.reply({ embeds: [permsEmbed], ephemeral: true })
            }
        }
    }
}