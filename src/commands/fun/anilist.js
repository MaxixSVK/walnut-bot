const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const e = require('express');
require('dotenv').config();

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
        const fetchAniListData = async (query, variables) => {
            try {
                const response = await axios.post('https://graphql.anilist.co', { query, variables });
                return response.data.data;
            } catch (error) {
                return null;
            }
        };

        const configSchema = interaction.client.configSchema
        let color = '#5865f2';

        if (interaction.guild) {
            const guildId = interaction.guild.id

            const configSchemaData = await configSchema.find({
                guildId: guildId
            });

            if (configSchemaData.length > 0 && configSchemaData[0].color) {
                color = configSchemaData[0].color;
            }
        }

        const noDataEmbed = new EmbedBuilder()
            .setTitle('No data found')
            .setDescription('No data was found for the specified query')
            .setColor('Red');

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'user-search') {
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
            const userData = await fetchAniListData(userQuery, { userName: username });

            if (!userData) {
                return interaction.reply({ embeds: [noDataEmbed], ephemeral: true });
            }

            const userEmbed = new EmbedBuilder()
                .setTitle(userData.User.name)
                .setURL(userData.User.siteUrl)
                .setThumbnail(userData.User.avatar.large)
                .setColor(color)
                .addFields(
                    { name: 'Anime Watched', value: `${userData.User.statistics.anime.count}`, inline: true },
                    { name: 'Episodes Watched', value: `${userData.User.statistics.anime.episodesWatched}`, inline: true },
                    { name: 'Minutes Watched', value: `${userData.User.statistics.anime.minutesWatched}`, inline: true },
                    { name: 'Manga Read', value: `${userData.User.statistics.manga.count}`, inline: true },
                    { name: 'Volumes Read', value: `${userData.User.statistics.manga.volumesRead}`, inline: true },
                    { name: 'Chapters Read', value: `${userData.User.statistics.manga.chaptersRead}`, inline: true }
                );

            if (userData.User.about) {
                userEmbed.setDescription(userData.User.about.replace(/<[^>]*>?/gm, ''));
            }

            if (userData.User.bannerImage) {
                const bannerEmbed = new EmbedBuilder()
                    .setImage(userData.User.bannerImage)
                    .setColor(color);

                return interaction.reply({ embeds: [bannerEmbed, userEmbed] });
            }

            return interaction.reply({ embeds: [userEmbed] });
        } else if (subcommand === 'anime-search') {
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
            const animeData = await fetchAniListData(animeQuery, { animeName });

            if (!animeData) {
                return interaction.reply({ embeds: [noDataEmbed], ephemeral: true });
            }

            const animeEmbed = new EmbedBuilder()
                .setTitle(animeData.Media.title.english || animeName)
                .setDescription(animeData.Media.description.replace(/<[^>]*>?/gm, '') || 'No description available')
                .setColor(color)
                .addFields(
                    { name: 'Episodes', value: animeData.Media.episodes ? `${animeData.Media.episodes}` : 'No data available', inline: true },
                    { name: 'Genres', value: animeData.Media.genres ? animeData.Media.genres.join(', ') : 'No data available', inline: true }
                );

            if (animeData.Media.siteUrl) {
                animeEmbed.setURL(animeData.Media.siteUrl);
            }
            if (animeData.Media.coverImage) {
                animeEmbed.setThumbnail(animeData.Media.coverImage.large);
            }

            if (animeData.Media.bannerImage) {
                const bannerEmbed = new EmbedBuilder()
                    .setImage(animeData.Media.bannerImage)
                    .setColor(color);

                return interaction.reply({ embeds: [bannerEmbed, animeEmbed] });
            }

            return interaction.reply({ embeds: [animeEmbed] });
        }
    },
};