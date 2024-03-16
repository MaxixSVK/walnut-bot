const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { OpenAI } = require('openai');
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anilist')
        .setDescription('Search for an AniList user or anime')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user-search')
                .setDescription('Search for an AniList user')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('The username of the AniList user')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('anime-search')
                .setDescription('Search for an anime using AniList')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('The name of the anime, manga is supported too')
                        .setRequired(true))),
    async execute(interaction) {
        async function fetchAnimeData(query, variables) {
            try {
                const response = await axios.post('https://graphql.anilist.co', {
                    query: query,
                    variables: variables,
                });

                return response;
            } catch (error) {
                return
            }
        }

        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        let color = '#5865f2';
        if (configSchemaData.length) {
            color = configSchemaData[0].color;
        }

        const errorEmbed = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('There was an error with your request\nSorry for the inconvenience')
            .setColor('Red')

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'user-search':
                const username = interaction.options.getString('username');

                const userQuery = `
                query ($userName: String) {
                    User(name: $userName) {
                        name
                        about
                        siteUrl
                        bannerImage
                        avatar {
                            large
                        }
                        statistics {
                            anime {
                                count
                                episodesWatched
                                minutesWatched
                            }
                            manga {
                                count
                                volumesRead
                                chaptersRead
                            }
                        }
                    }
                }`;

                const userVariables = {
                    userName: username,
                };

                fetchAnimeData(userQuery, userVariables)
                    .then(async (baseUserData) => {
                        const userData = baseUserData.data.data.User;
                        const userStats = userData.statistics;

                        const userInfoEmbed = new EmbedBuilder()
                            .setTitle(userData.name)
                            .setURL(userData.siteUrl)
                            .setThumbnail(userData.avatar.large)
                            .setColor(color)
                            .addFields(
                                {
                                    name: 'Anime Watched',
                                    value: `${userStats.anime.count}`,
                                    inline: true,
                                },
                                {
                                    name: 'Episodes Watched',
                                    value: `${userStats.anime.episodesWatched}`,
                                    inline: true,
                                },
                                {
                                    name: 'Minutes Watched',
                                    value: `${userStats.anime.minutesWatched}`,
                                    inline: true,
                                },
                                {
                                    name: 'Manga Read',
                                    value: `${userStats.manga.count}`,
                                    inline: true,
                                },
                                {
                                    name: 'Volumes Read',
                                    value: `${userStats.manga.volumesRead}`,
                                    inline: true,
                                },
                                {
                                    name: 'Chapters Read',
                                    value: `${userStats.manga.chaptersRead}`,
                                    inline: true,
                                }
                            )

                        if (userData.about) {
                            userInfoEmbed.setDescription(userData.about.replace(/<[^>]*>?/gm, ''));
                        }

                        if (userData.bannerImage) {
                            const userImgEmbed = new EmbedBuilder()
                                .setImage(userData.bannerImage)
                                .setColor(color);

                            return interaction.reply({ embeds: [userImgEmbed, userInfoEmbed] });
                        }

                        interaction.reply({ embeds: [userInfoEmbed] });
                    })
                    .catch((error) => {
                        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    });
                break;
            case 'anime-search':
                const animeName = interaction.options.getString('name');
                const animeQuery = `
                    query ($animeName: String) {
                        Media(search: $animeName, type: ANIME) {
                            title {
                                english
                            }
                            siteUrl
                            coverImage {
                                large
                            }
                            bannerImage
                            description
                            episodes
                            genres
                            isAdult
                        }
                    }`;

                const animeVariables = {
                    animeName: animeName,
                };

                fetchAnimeData(animeQuery, animeVariables)
                    .then(async (baseAnimeData) => {
                        const animeData = baseAnimeData.data.data.Media;

                        const animeEmbed = new EmbedBuilder()
                            .setTitle(animeData.title.english || animeName)
                            .setDescription(animeData.description.replace(/<[^>]*>?/gm, '') || 'No description available')
                            .setColor(color)
                            .addFields(
                                {
                                    name: 'Episodes',
                                    value: animeData.episodes ? `${animeData.episodes}` : 'No data available',
                                    inline: true,
                                },
                                {
                                    name: 'Genres',
                                    value: animeData.genres ? `${animeData.genres.join(', ')}` : 'No data available',
                                    inline: true,
                                }
                            )

                        if (animeData.isAdult && configSchemaData[0].disableNsfw) {
                            const nsfwEmbed = new EmbedBuilder()
                                .setTitle('NSFW content is disabled')
                                .setDescription('NSFW content is disabled in this server')
                                .setColor('Red')
                            return interaction.reply({ embeds: [nsfwEmbed], ephemeral: true });
                        }
                        if (animeData.siteUrl) {
                            animeEmbed.setURL(animeData.siteUrl);
                        }
                        if (animeData.coverImage) {
                            animeEmbed.setThumbnail(animeData.coverImage.large);
                        }

                        if (animeData.bannerImage) {
                            const animeImgEmbed = new EmbedBuilder()
                                .setImage(animeData.bannerImage)
                                .setColor(color);

                            return interaction.reply({ embeds: [animeImgEmbed, animeEmbed] });
                        }

                        interaction.reply({ embeds: [animeEmbed] });

                    })
                    .catch((error) => {
                        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    });
                break;
        }
    },
};