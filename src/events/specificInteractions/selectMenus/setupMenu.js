const { EmbedBuilder } = require('discord.js');

// WARNING: HARD CODED STRINGS THAT ARE RELEVANT ONLY FOR LR SERVER 

module.exports = {
    async execute(interaction) {
        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        let color = '#5865f2';
        if (configSchemaData.length) {
            color = configSchemaData[0].color;
        }

        async function createEmbed(title, description, image) {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(title)
                .setDescription(description);

            if (image) {
                embed.setImage(image);
            }
            return embed;
        }

        const noDataEmebed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Unavailable')
            .setDescription(`Sorry, this section is currently unavailable,\n It will be updated with new information over time`)

        switch (interaction.values[0]) {
            case 'server':
                await interaction.update(interaction)

                const serverImgEmbed = await createEmbed(null, null, 'https://i.imgur.com/VrqxmXm.png');
                const ServerTxtEmbed = await createEmbed('INFO', null, null);
                ServerTxtEmbed.addFields(
                    {
                        name: 'About us',
                        value: 'This server is dedicated to Lycoris Recoil (リコリス・リコイル) original TV Anime Series set to be produced by A-1 Pictures and Director Shingo Adachi (SAO, To-Love Ru) featuring an original story by Asaura and Character Design by Imigimuru.'
                    },
                    {
                        name: 'Lycoris Recoil Community',
                        value: 'Discord Invite Links\n:small_blue_diamond:[Official](https:/discord.gg/LycorisRecoil)\n:small_blue_diamond:[Permanent](https:/discord.gg/x6dDkKmdXM)\nOfficial Website for Lycoris Recoil\n:small_blue_diamond:[Japanese](https://lycoris-recoil.com/)\n:small_blue_diamond:[English](https://lycorisrecoil.com/)\nOther Links\n:small_blue_diamond:[Subreddit](https://www.reddit.com/r/LycorisRecoil/)\n:small_blue_diamond:[Official X Page](https://x.com/lycoris_recoil)\n:small_blue_diamond:[Wiki](https://lycoris-recoil.fandom.com/wiki/Lycoris_Recoil_Wiki)'
                    }
                );

                interaction.followUp({ embeds: [serverImgEmbed, ServerTxtEmbed], ephemeral: true });
                break;

            case 'strike':
                await interaction.update(interaction)

                const strikeTxtEmbed = await createEmbed('Strike system', null, null);
                strikeTxtEmbed.addFields(
                    {
                        name: 'Infraction Levels',
                        value: 'This server follows a 4 strike system applied to major offenses.\n1. Strike - One hour mute\n2. Strike - 24 hour mute\n3. Strike - 48 hour mute\n4. Strike - Ban\n'
                    },
                    {
                        name: 'Notes',
                        value: ':small_orange_diamond: Please note that this is just a standard system, our moderators are free to choose the punishment as they feel necessary, subject to the incident.\n:small_orange_diamond: A strike can be retracted after a user has shown genuine improvement after a period of time.\n:small_orange_diamond: Rapid fire violations can lead to an immediate ban, regardless of prior strikes'
                    }
                )

                interaction.followUp({ embeds: [strikeTxtEmbed], ephemeral: true })
                break;

            case 'staff':
                await interaction.update(interaction)

                const staffTxtEmbed = await createEmbed('Our Staff', null, null);
                staffTxtEmbed.addFields(
                    {
                        name: 'Owner',
                        value: `<@944156317399011388>`,
                        inline: true
                    },
                    {
                        name: 'Admins',
                        value: `<@838708612402249740>\n<@884661972254199838>\n<@944156317399011388>\n<@119142790537019392>\n<@258118512575381506>`,
                        inline: true
                    },
                    {
                        name: 'Bot Dev',
                        value: `<@694569759093817374>`,
                        inline: true
                    },
                    {
                        name: 'Discord Moderators',
                        value: `<@599973543672938511>\n<@754205110825123930>\n<@354957913187680257>`,
                    },
                    {
                        name: 'Wiki Moderators',
                        value: `\n<@944156317399011388>`,
                    },
                    {
                        name: 'Reddit Moderators',
                        value: `[u/ButterShadowxx](https://www.reddit.com/user/ButterShadowxx/) - <@944156317399011388>\n[u/zenzen_0](https://www.reddit.com/user/zenzen_0/)\n[u/N3DSDUDE](https://www.reddit.com/user/N3DSdude/)\n[u/NeedAGoodUsername](https://www.reddit.com/user/NeedAGoodUsername/)\n[u/Spring-R0ll](https://www.reddit.com/user/Spring-R0ll/)`
                    }
                );

                interaction.followUp({ embeds: [staffTxtEmbed], ephemeral: true });
                break;

            case 'partnership':
                await interaction.update(interaction)

                const partnershipImgEmbed = await createEmbed(null, null, 'https://i.imgur.com/TvwOxUH.png');
                const partnershipTxtEmbed = await createEmbed('Affiliations', null, null);
                partnershipTxtEmbed.addFields(
                    {
                        name: 'Requirements',
                        value: ':small_orange_diamond: Series should preferably be based of a Light Novel/Manga/Anime.\n:small_orange_diamond: There should be a mutual connection between the server, reddit and wiki database.\n:small_orange_diamond: The server rules must be proper and must follow Discord TOS & Guidelines\n:small_orange_diamond: 300 minimum server members'
                    },
                    {
                        name: 'How to apply',
                        value: 'In order to apply for an affiliation, you can choose between either DMing one of our admins, or you can create a ticket through ⁠contact staff button. After your ticket is made, a staff member will get in contact with you shortly.'
                    },
                    {
                        name: 'FORMAT',
                        value: ':small_blue_diamond:Name of the series.\n:small_blue_diamond:Story Synopsis (Preferably a short synopsis)\n:small_blue_diamond:Links\nDiscord Invite\n:small_blue_diamond:Affiliated wiki fandom for the series (optional)\n:small_blue_diamond:Affiliated Reddit (optional)\n:small_blue_diamond:Server Icon'
                    }
                );

                interaction.followUp({ embeds: [partnershipImgEmbed, partnershipTxtEmbed], ephemeral: true });
                break;

            case 'xp':
                await interaction.update(interaction)

                const xpImgEmbed = await createEmbed(null, null, 'https://i.imgur.com/lPBVqIt.png');
                const xpTxtEmbed1 = await createEmbed(
                    'XP Level System: Tatsu',
                    'Our server’s leveling system comes with a few perks! Talk and have conversations with other members in any channel and send messages to earn XP and level up! Each level comes with a new role and a corresponding character icon.\n\nYou can go to <#1041597286024749107> and type t!rank to check your personal level scorecard or t!top to see the leaderboard. ',
                    null);
                const xpTxtEmbed2 = await createEmbed(
                    "**Our leveled roles advance as follows:**",
                    '- Regular Customer – 500XP – Grants image posting permissions in <#1041573615822450800>\n- Café Worker – 5,000XP\n- Café Manager – 10,000XP\n- Novice Hacker – 25,000XP\n- Expert Hacker – 50,000XP\n- Rookie Lycoris – 75,000XP\n- 2nd Lycoris – 100,000XP\n- 1st Lycoris – 150,000XP\n- Pro Lycoris – 200,000XP\n- Elite Lycoris – 250,000XP\n- Lycoris Commander – 300,000XP\n- Head of DA – 400,000\n- Legendary Lycoris – 500,000XP',
                    null);

                interaction.followUp({ embeds: [xpImgEmbed, xpTxtEmbed1, xpTxtEmbed2], ephemeral: true });
                break;
        }
    }
}
