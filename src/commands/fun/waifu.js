const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Get a random waifu picture'),
    async execute(interaction) {
        if (interaction.user.id !== '694569759093817374') {
            const noPermsEmbed = new EmbedBuilder()
                .setTitle('No Permission')
                .setDescription('You do not have permission to use this command.')
                .setColor('Red')
            return interaction.reply({ embeds: [noPermsEmbed], ephemeral: true });
        }
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
