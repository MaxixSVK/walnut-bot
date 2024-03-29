const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Get a random waifu picture'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/waifu');
            const imageUrl = response.data.url;

            await interaction.reply(imageUrl);
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('There was an error with your request\nSorry for the inconvenience')
                .setColor('Red')

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
