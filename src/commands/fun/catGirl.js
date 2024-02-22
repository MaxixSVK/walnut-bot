const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catgirl')
        .setDescription('Get a random catgirl picture'),
    async execute(interaction) {
        try {
            const random = await axios.get('https://nekos.moe/api/v1/random/image?nsfw=false');
            const catgirlImageid = random.data.images[0].id;
            const catgirlImageUrl = `https://nekos.moe/image/${catgirlImageid}`;
            
            await interaction.reply(catgirlImageUrl);
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('There was an error with your request\nSorry for the inconvenience')
                .setColor('Red')

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};