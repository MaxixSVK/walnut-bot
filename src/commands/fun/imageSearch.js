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
                    isAdult
                }
            }`;

        const variables = {
            id: traceMoeResult.anilist,
        };

        axios.post('https://graphql.anilist.co', {
            query: query,
            variables: variables,
        })
            .then(async response => {
                const animeData = response.data.data.Media;
                const configSchema = interaction.client.configSchema
                const guildId = interaction.guild.id

                const configSchemaData = await configSchema.find({
                    guildId: guildId
                });

                if (animeData.isAdult && configSchemaData[0].disableNsfw) {
                    const nsfwEmbed = new EmbedBuilder()
                        .setTitle('NSFW content is disabled')
                        .setDescription('NSFW content is disabled in this server')
                        .setColor('Red')
                    return interaction.reply({ embeds: [nsfwEmbed], ephemeral: true });
                }

                let color = '#5865f2';
                if (configSchemaData.length) {
                    color = configSchemaData[0].color;
                }

                const resultEmbed = new EmbedBuilder()
                    .setTitle('I found something!')
                    .setURL(animeData.siteUrl)
                    .setDescription(`This looks like ${animeData.title.english}`)
                    .setImage(traceMoeResult.image)
                    .setColor(color)
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
            .catch((error) => {
                const errorEmbed = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('An error occurred while fetching data, please try again')
                    .setColor('#ff0000');

                interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
            });
    }
};