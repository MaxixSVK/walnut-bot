const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message-setup')
        .setDescription('Setup message in rules and info channel')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const InfoButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verifyMenuButton')
                    .setLabel('Verify')
                    .setEmoji('✅')
                    .setStyle(ButtonStyle.Secondary),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket')
                    .setLabel('Contact Staff')
                    .setEmoji('997584350407295178')
                    .setStyle(ButtonStyle.Secondary),
            )

        const menuContent = [
            {
                label: 'Server Info',
                description: 'Select to foud out more about a server.',
                value: 'server',
                emoji: '994615569833791498'
            },
            {
                label: 'Strike System',
                description: 'Select to foud out more about strike system.',
                value: 'strike',
                emoji: '994650226453397634'
            },
            {
                label: 'Café Staff',
                description: 'Select to lear about our lovely staff.',
                value: 'staff',
                emoji: '993444445741645845',
            },
            {
                label: 'Sister Server',
                description: 'Select to view our sister server.',
                value: 'servers',
                emoji: '1014257843974721606',
            },
            {
                label: 'Partnership Info',
                description: 'Select to view terms & conditions on affiliating.',
                value: 'partnership',
                emoji: '997572362876760135',
            },
            {
                label: 'XP System',
                description: 'Select to learn about our XP System.',
                value: 'xp',
                emoji: '997605599531507873',
            },
        ];

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('setupMenu')
            .setPlaceholder('Make a selection')
            .setMinValues(0)
            .setMaxValues(1)
            .addOptions(
                menuContent.map((content) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(content.label)
                        .setDescription(content.description)
                        .setValue(content.value)
                        .setEmoji(content.emoji)
                )
            )

        const selectMenuRow = new ActionRowBuilder().addComponents(selectMenu)

        const text1 = `
🔶 **Follow the Discord Terms of Services & Guidelines.**
\n🔹**[Discord Terms](https://discord.com/terms)**
**🔹[Discord Guidelines](https://discord.com/guidelines)**
\n> Severe violations will result in an immediate ban. This includes but is not limited to being under the age of 13, Modification of client & Raiding.
\n🔶 **Be respectful, avoid potentially sensitive or awkward topics.**
\n> To keep this community welcoming for anyone; Harassment, Toxicity and Discrimination will not be tolerated. If you have an issue with another user, please handle it in your DMs rather than settling your disputes in our server.
\n> Controversial topics should be kept out of the server. This can include Political, religious discussions etc. NSFW topics or conversations with NSFW nature are strictly not allowed.
\n> No negative talk. Racist, trolling, flaming, and/or any other destructive speech and material are prohibited.
\n> Casual jokes are fine, but if a member feels uncomfortable with those jokes then stop making them, even if they are not directed at the member in question.
\n🔶 **Do not post NSFW or unsafe content.**
\n> Posting media that contains or heavily alludes to NSFW or NSFL content is forbidden. IP loggers, viruses, and any other file that does not embed into discord should be refrained from being posted in this server.
\n> This rule applies to your profile as well, there are no inappropriate profiles allowed. Present yourself with a proper nickname and profile picture. Engage in civilized speech and manner.
\n> Roleplaying and Excessive flirting should remain in DMs, this is not a dating server.
\n🔶 **Do not spam and/or advertise.**
\n> Avoid messages that are designed to flood the chat, such as copy-pastas & rapid message sending.
\n> Do not advertise. Do not post links to other Discord servers or to promote yourself. This includes asking users to like/subscribe/donate/etc. to you or another individual. This rule extends to your DMs with other server members.
\n🔶 **Spoilers should be kept out of all chats other than the appropriate channels.**
\n> Moderation around this rule is very strict. <#1041573615822450800> is our general chat, it is NOT a place to discuss the series.
\n> All discussions around Lycoris Recoil should be kept under channels within the channels under the Lycoris Recoil category
\n🔶 **Do not attempt to take advantage of any loop-holes within the rules.**
\n> Do not attempt to find loopholes in these rules or bypass the auto-mod system. Repeatedly almost violating the rules or 'Toeing the line' is not permitted.
\n🔶 **The staff team reserves the right to make any decision they see fit to keep the server running smoothly.**
\n> “Not breaking any of the rules” does not excuse you from purposefully degrading the server’s quality.
\n> If you believe that a staff member is being abusive towards others or possibly you then please DM create a Ticket by clicking "contact staff" right away to resolve the issue at hand.`

        const text2 = `
**In order to gain access to our server and start chatting, please use the selection menu below.**
\nPlease note that when you choose to verify, you also accept our rules and conditions. Excuses such as \`I did not know there were rules.\` or \`I did not read the rules.\` will not be accepted as valid excuses.`

        const firstembed = new EmbedBuilder()
            .setColor('#E51468')
            .setImage('https://i.imgur.com/Pxy76NO.png')

        const secondembed = new EmbedBuilder()
            .setTitle(`Lycoris Recoil Discord Rules\nPlease read this section carefully.`)
            .setColor('#E51468')
            .setDescription(`${text1}`)

        const thirdembed = new EmbedBuilder()
            .setColor('#E51468')
            .setTitle('Verification and Server Access')
            .setDescription(`${text2}`)

        const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Setup completed')
            .setDescription('Setup completed successfully, message sent')

        const configSchema = interaction.client.configSchema;
        const guildId = interaction.guild.id;

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (configSchemaData.length == 0) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription('Please complete config setup first')

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const channelId = configSchemaData.map(item => item.mainChannelId).toString()
        const channel = interaction.client.channels.cache.get(channelId);

        channel.send({ embeds: [firstembed, secondembed, thirdembed], components: [selectMenuRow, InfoButtons] });
        interaction.reply({ embeds: [setupEmbed], ephemeral: true });
    }
};
