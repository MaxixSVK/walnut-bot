const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play rock paper scissors with Walnut'),
    async execute(interaction) {
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setEmoji('🪨')
                    .setStyle(ButtonStyle.Secondary),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setEmoji('📰')
                    .setStyle(ButtonStyle.Secondary)

            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setEmoji('✂️')
                    .setStyle(ButtonStyle.Secondary)
            );

        const embed = new EmbedBuilder()
            .setTitle(`Let's play RPS`)
            .setDescription('Now you can play rock paper scissors with Walnut')
            .setColor(config.Color)

        await interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
    },
};