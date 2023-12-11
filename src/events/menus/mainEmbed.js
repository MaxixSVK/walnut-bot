const { Events, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === 'setupMenu') {
            const samplemebed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Unavailable')
                .setDescription(`Sorry, this section is currently unavailable,\n It will be updated with new information over time`)

            if (interaction.values == 'server') {
                await interaction.update(interaction)

                fs.readFile(path.join(__dirname, 'strings/server.txt'), 'utf8', function (err, data) {
                    if (err) throw err;
                    const imgEmbed = new EmbedBuilder()
                        .setColor(interaction.client.config.color)
                        .setImage('https://i.imgur.com/VrqxmXm.png')

                    const txtEmbed = new EmbedBuilder()
                        .setColor(interaction.client.config.color)
                        .setTitle('About us')
                        .setDescription(data)

                    interaction.followUp({ embeds: [imgEmbed, txtEmbed], ephemeral: true })
                });
            }
            if (interaction.values == 'strike') {
                await interaction.update(interaction)

                fs.readFile(path.join(__dirname, 'strings/strike.txt'), 'utf8', function (err, data) {
                    if (err) throw err;
                    const txtEmbed = new EmbedBuilder()
                        .setColor(interaction.client.config.color)
                        .setTitle('Strike system')
                        .setDescription(data)

                    interaction.followUp({ embeds: [txtEmbed], ephemeral: true })
                });
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
                fs.readFile(path.join(__dirname, 'strings/affiliation.txt'), 'utf8', function (err, data) {
                    if (err) throw err;
                    const imgEmbed = new EmbedBuilder()
                        .setColor(interaction.client.config.color)
                        .setImage('https://i.imgur.com/TvwOxUH.png')

                    const txtEmbed = new EmbedBuilder()
                        .setColor(interaction.client.config.color)
                        .setTitle('Affiliations')
                        .setDescription(data)

                    interaction.followUp({ embeds: [imgEmbed, txtEmbed], ephemeral: true })
                });
            }
            if (interaction.values == 'xp') {
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [samplemebed], ephemeral: true })
            }

        }
    }
}