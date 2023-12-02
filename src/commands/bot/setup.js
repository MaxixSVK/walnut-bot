const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const config = require("../../config.json");
const path = require('path');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("just a setup command")
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

        const actionRow = new ActionRowBuilder().addComponents(selectMenu)
        fs.readFile(path.join(__dirname, 'strings/mainTxt.txt'), 'utf8', function (err, data) {
            if (err) throw err;
            const firstembed = new EmbedBuilder()
                .setColor("#E51468")
                .setImage('https://i.imgur.com/Pxy76NO.png')

            const txt1 = String(data);

            const secondembed = new EmbedBuilder()
                .setTitle(`Lycoris Recoil Discord Rules\nPlease read this section carefully.`)
                .setColor("#E51468")
                .setDescription(txt1)

            const actionRow = new ActionRowBuilder().addComponents(selectMenu)
            fs.readFile(path.join(__dirname, 'strings/secondTxt.txt'), 'utf8', function (err, data) {
                if (err) throw err;
                const txt2 = String(data);
                
                const thirdembed = new EmbedBuilder()
                    .setColor("#E51468")
                    .setTitle("Verification and Server Access")
                    .setDescription(txt2)

                const setupEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle("Setup has been completed")

                const channel = interaction.guild.channels.cache.find(channel => channel.name == config.RulesChannel);

                channel.send({ embeds: [firstembed, secondembed, thirdembed], components: [actionRow, InfoButtons] });
                interaction.reply({ embeds: [setupEmbed] });
            });
        });
    }
}
