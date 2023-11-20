const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random-gif")
        .setDescription("Random gif"),
    async execute(interaction) {
        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const images = [
            'https://logos-world.net/wp-content/uploads/2020/12/Discord-Emblem.png',
            'https://wallpaperaccess.com/full/765574.jpg',
            'https://i0.wp.com/discordtemplates.me/icon.png',
            'https://explodingstarpodcast.files.wordpress.com/2021/07/iconfinder_social-media_discord-alt_2417764.png',
        ];


        const embed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle("Mini bot")
            .setImage([random(images.toString())])

        await interaction.reply({ embeds: [embed] });
    },
};