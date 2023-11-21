const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const members = member.guild.memberCount

        const welcomeEmbed = new EmbedBuilder()
        .setTitle("Welcome to Café LycoReco!")
        .setDescription(`Please make sure to read our <#990527996043603971> page and for everything you need to know about our server, and gain access to our chats once you are ready!`)
        .setColor("#D78B84")
        .setImage("https://i.postimg.cc/4xBz7zHx/lycorisrecoil-001.gif")
        .setFooter({ text: `Customer Number: ${members}`});

        const channel = member.guild.channels.cache.find(channel => channel.name == "welcome");
        channel.send({ content: `Hello ${member}! May we take your order?`,embeds: [welcomeEmbed]});

    }
}