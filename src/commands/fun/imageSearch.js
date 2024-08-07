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

        const response = await axios.post('https://graphql.anilist.co', {
            query: query,
            variables: variables,
        });

        const animeData = response.data.data.Media;
        const configSchema = interaction.client.configSchema;
        let color = '#5865f2';

        if (interaction.guild) {
            const guildId = interaction.guild.id;
            const configSchemaData = await configSchema.find({ guildId: guildId });

            if (configSchemaData.length > 0) {
                if (animeData.isAdult && configSchemaData[0].disableNsfw) {
                    const nsfwEmbed = new EmbedBuilder()
                        .setTitle('NSFW content is disabled')
                        .setDescription('NSFW content is disabled in this server')
                        .setColor('Red');
                    return interaction.editReply({ embeds: [nsfwEmbed], ephemeral: true });
                }

                color = configSchemaData[0].color || color;
            }
        }

        const resultEmbed = new EmbedBuilder()
            .setTitle('I found something!')
            .setURL(animeData.siteUrl)
            .setDescription(`This looks like ${animeData.title.english || 'Unknown'}`)
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
    }
};