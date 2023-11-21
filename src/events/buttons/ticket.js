const { Events, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === "ticket") {

            const interactionuser = await interaction.guild.members.fetch(interaction.user.id)
            const username = interactionuser.user.username
            const channelName = `ticket-${username}`
            const channel = interaction.guild.channels.cache.find(channel => channel.name == channelName);

            if (!channel) {
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
            else {
                const alredyEmbed = new EmbedBuilder()
                    .setTitle("You already have ticket")
                    .setDescription("You already have opened on ticket in the past, please close it before opening new one")
                    .setColor("Orange")

                interaction.reply({ embeds: [alredyEmbed], ephemeral: true })
            }
        }
    }
}