const { Events, EmbedBuilder } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const members = member.guild.memberCount
        const guild = member.guild
        const verifyRole = guild.roles.cache.find(role => role.name === config.UnverifiedRole);

        await member.roles.add(verifyRole);

        const welcomeEmbed = new EmbedBuilder()
        .setTitle("Welcome to Café LycoReco!")
        .setDescription(`Please make sure to read our <#990527996043603971> page and for everything you need to know about our server, and gain access to our chats once you are ready!`)
        .setColor(config.Color)
        .setImage("https://i.postimg.cc/4xBz7zHx/lycorisrecoil-001.gif")
        .setFooter({ text: `Customer Number: ${members}`});

        const channel = member.guild.channels.cache.find(channel => channel.name == config.WelcomeChannel);
        channel.send({ content: `Hello ${member}! May we take your order?`,embeds: [welcomeEmbed]});

    }
}