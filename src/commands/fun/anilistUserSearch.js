const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anilist')
        .setDescription('Shows information about an AniList user')
        .addStringOption(option => option
            .setName('username')
            .setDescription('The username of the AniList user')
            .setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getString('username');

        const query = `
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

        const variables = {
            userName: username,
        };

        axios
            .post('https://graphql.anilist.co', {
                query: query,
                variables: variables,
            })
            .then((result) => {
                const userData = result.data.data.User;
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
                const errorEmbed = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('An error occurred while fetching user data, check the username and try again')
                    .setColor('#ff0000');

                interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
    },
};