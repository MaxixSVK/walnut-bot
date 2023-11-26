const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
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

                interaction.reply("ok")
            }
            else {
                const permsEmbed = new EmbedBuilder()
                    .setTitle("No permissions")
                    .setDescription("You don't have permission to close this ticket")
                    .setColor("Red")

                await interaction.reply({ embeds: [permsEmbed], ephemeral: true  })
            }
        }
    }
}