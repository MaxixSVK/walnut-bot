const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === "Menu1") {

            const samplemebed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Chisato")
                .setDescription(`Hi, this is a test - chisato`)

            if (interaction.values == 'verify')
                interaction.reply({ embeds: [samplemebed], ephemeral: true })
            if (interaction.values == 'staff')
                interaction.reply({ embeds: [samplemebed], ephemeral: true })
            if (interaction.values == 'servers')
                interaction.reply({ embeds: [samplemebed], ephemeral: true })
            if (interaction.values == 'partnership')
                interaction.reply({ embeds: [samplemebed], ephemeral: true })
            if (interaction.values == 'xp')
                interaction.reply({ embeds: [samplemebed], ephemeral: true })
        }
    }
}