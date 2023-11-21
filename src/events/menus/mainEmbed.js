const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === "setupMenu") {

            const samplemebed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Chisato")
                .setDescription(`Hi, this is a menu test - chisato`)

            //replies for main embed 
            if (interaction.values == 'server') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }
            if (interaction.values == 'strike') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }
            if (interaction.values == 'staff') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }
            if (interaction.values == 'servers') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }
            if (interaction.values == 'partnership') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }
            if (interaction.values == 'xp') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }

        }
    }
}