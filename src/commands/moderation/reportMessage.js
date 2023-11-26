const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const config = require("../../config.json");
const uniqid = require('uniqid');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Report message')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const roleId = interaction.guild.roles.cache.find(role => role.name == config.StaffRole);
        const reportId = uniqid();
        const channelName = `report-${reportId}`

        interaction.guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: roleId,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        })

        const reportedEmbed = new EmbedBuilder()
            .setTitle(`The message has been reported`)
            .setDescription(`<@${interaction.member.id}> reported a message.\n Content of the message was verifiend`)
            .setColor(config.Color)
            .addFields(
                { name: "Who's message has been reported:", value: `${interaction.targetMessage.author}`, inline: false },
                { name: "Reported message:", value: `${interaction.targetMessage.content}`, inline: false },
                { name: "Report ID:", value: reportId, inline: false },
            )

        const reportCreated = new EmbedBuilder()
            .setTitle("Report has been sent successfully")
            .setDescription("Thank you for making this server a better place.")
            .setColor("Green")

        setTimeout(() => {
            const reportChannel = interaction.guild.channels.cache.find(channel => channel.name == channelName);
            reportChannel.send({ content: `<@${interaction.user.id}> has reported a message <@&1176584982416863273>`, embeds: [reportedEmbed] });
        }, 3000);

        interaction.reply({ embeds: [reportCreated], ephemeral: true });
    }
}