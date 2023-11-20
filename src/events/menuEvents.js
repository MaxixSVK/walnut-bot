const { Events, EmbedBuilder, } = require('discord.js');

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
            if (interaction.values == 'server')
                interaction.reply({ embeds: [samplemebed], ephemeral: true })
            if (interaction.values == 'strike')
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