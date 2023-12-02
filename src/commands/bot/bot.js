const { SlashCommandBuilder ,EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
const information = require('../../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informations about Walnut'),
    async execute(interaction) {
        const botEmbed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle('Walnut')
            .setURL('https://github.com/MaxixSVK/walnut-bot')
            .addFields(
                { name: ':speech_balloon: Version:', value: information.version , inline: true },
                { name: ':busts_in_silhouette: Author:', value: 'Maxix', inline: true },
            )
            .setImage('https://i.imgur.com/NvxcmjO.png')
            
        await interaction.reply({ embeds: [botEmbed], ephemeral: true  });
    },
};