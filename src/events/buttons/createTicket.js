const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === "ticket") {

            const ticketModal = new ModalBuilder()
                .setCustomId('ticketModal')
                .setTitle('Contact staff team')

            const titleInput = new TextInputBuilder()
                .setCustomId('titTicketleInput')
                .setLabel("Please enter ticket name")
                .setStyle(TextInputStyle.Short);

            const dscInput = new TextInputBuilder()
                .setCustomId('dscTicketInput')
                .setLabel("Please enter further context")
                .setStyle(TextInputStyle.Paragraph);

            const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
            const secondActionRow = new ActionRowBuilder().addComponents(dscInput);

            ticketModal.addComponents(firstActionRow, secondActionRow);

            await interaction.showModal(ticketModal);
        }
    }
}