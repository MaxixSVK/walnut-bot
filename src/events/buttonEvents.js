const { Events, ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const samplemebed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Chisato")
        .setDescription(`Hi, this is a button test - chisato`)

        if (interaction.customId === "serverInfo") {
            interaction.reply({ embeds: [samplemebed], ephemeral: true });
        }
        if (interaction.customId === "strikeSystem") {
            interaction.reply({ embeds: [samplemebed], ephemeral: true });
        }
    }
};