const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime-img-search')
        .setDescription('Search for an anime using images')
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('The image to search')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const image = interaction.options.getAttachment('image');

        const traceMoeResponse = await axios.get('https://api.trace.moe/search', {
            params: {
                url: image.url
            }
        });

        const traceMoeResult = traceMoeResponse.data.result[0];

        const query = `
    query ($id: Int) { 
        Media (id: $id, type: ANIME) { 
            siteUrl
            title {
                english
            }
            episodes
        }
    }
`;

        const variables = {
            id: traceMoeResult.anilist,
        };

        axios.post('https://graphql.anilist.co', {
            query: query,
            variables: variables,
        })
            .then(response => {
                const animeData = response.data.data.Media;

                const resultEmbed = new EmbedBuilder()
                    .setTitle('I found something!')
                    .setURL(animeData.siteUrl)
                    .setDescription(`This looks like ${animeData.title.english}`)
                    .setImage(traceMoeResult.image)
                    .setColor(interaction.client.config.color)
                    .addFields(
                        {
                            name: 'Similiarity',
                            value: `${(traceMoeResult.similarity * 100).toFixed(2)}%`,
                            inline: true
                        },
                        {
                            name: 'Episode',
                            value: `${traceMoeResult.episode}/${animeData.episodes}`,
                            inline: true
                        },
                    )

                interaction.editReply({ embeds: [resultEmbed] });
            })
            .catch();
    }
};