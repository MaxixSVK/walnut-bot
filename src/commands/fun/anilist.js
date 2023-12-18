const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

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
                        .setRequired(true)))
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

        const errorEmbed = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('An error occurred while fetching data, check the name and try again')
        .setColor('#ff0000');

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'user-search':
                const username = interaction.options.getString('username');
                const userQuery = `
                query ($userName: String) {
                    User(name: $userName) {
                        name
                        siteUrl
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
                }
                `;

                const userVariables = {
                    userName: username,
                };

                fetchAnimeData(userQuery, userVariables)
                    .then((baseUserData) => {
                        const userData = baseUserData.data.data.User;
                        const userStats = userData.statistics;

                        const userInfoEmbed = new EmbedBuilder()
                            .setTitle(userData.name)
                            .setURL(userData.siteUrl)
                            .setThumbnail(userData.avatar.large)
                            .setColor(interaction.client.config.color)
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
                  }
                }
                `;

                const animeVariables = {
                    animeName: animeName,
                };

                fetchAnimeData(animeQuery, animeVariables)
                    .then((baseAnimeData) => {
                        const animeData = baseAnimeData.data.data.Media;

                        const animeImgEmbed = new EmbedBuilder()
                            .setImage(animeData.bannerImage)
                            .setColor(interaction.client.config.color);

                        const animeEmbed = new EmbedBuilder()
                            .setTitle(animeData.title.english)
                            .setURL(animeData.siteUrl)
                            .setThumbnail(animeData.coverImage.large)
                            .setDescription(animeData.description.replace(/<[^>]*>?/gm, ''))
                            .setColor(interaction.client.config.color)
                            .addFields(
                                {
                                    name: 'Episodes',
                                    value: `${animeData.episodes}`,
                                    inline: true,
                                },
                                {
                                    name: 'Genres',
                                    value: `${animeData.genres.join(', ')}`,
                                    inline: true,
                                }
                            )

                        interaction.reply({ embeds: [animeImgEmbed, animeEmbed] });
                    })
                    .catch((error) => {
                        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    });
                break;
        }
    },
};