const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === "deleteTicket") {

            interaction.reply("Channel deletion in progress")

            const channel = interaction.channel
            channel.delete()
            
        }
    }
}