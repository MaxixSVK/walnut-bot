const {  SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const config = require("../../config.json");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("manga")
        .setDescription("manga search")
        .addStringOption(option =>
            option
              .setName("name")
              .setDescription("Your question for AI.")
              .setRequired(true)),
    async execute(interaction) {
        const title = interaction.options.getString("name");

        const baseUrl = 'https://api.mangadex.org';

        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: {
                title: "title"
            }
        });
        
        const mangaIds = resp.data.data.map(manga => manga.id)

        const feed = await axios({
            method: 'GET',
            url: `${baseUrl}/manga/${mangaIds[0]}/feed`,
        });
        
        const chaptersIds = feed.data.data.map(title => title.id)

        const chapter = await axios({
            method: 'GET',
            url: `${baseUrl}/at-home/server/${chaptersIds[0]}`,
        });

        const baseImageUrl = chapter.data.baseUrl
        const imagehash = chapter.data.chapter.hash
        const imagesIds = chapter.data.chapter.data

        const image = `${baseImageUrl}/data/${imagehash}/${imagesIds[0]}`
        console.log(image)
        
        const atcImage = new AttachmentBuilder(image, { name: "atcImage.png" })
        
        const embed = new EmbedBuilder()
            .setColor("#E51468")
            .setImage(`attachment://atcImage.png`)

        interaction.reply({ embeds: [embed], files: [atcImage],})
    }
}