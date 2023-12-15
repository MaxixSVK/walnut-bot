const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const images = [
            'https://i.imgur.com/Oatpx2O.png',
            'https://i.imgur.com/cWvOC3j.png',
            'https://i.imgur.com/HpJtbGy.png',
            'https://i.imgur.com/VR4Gsnp.png',
            'https://i.imgur.com/TAQjRHu.png',
            'https://i.imgur.com/NcgX2KS.png',
        ];

        const members = member.guild.memberCount
        const verifyRole = member.client.config.unverifiedRole;

        await member.roles.add(verifyRole);

        const welcomeEmbed = new EmbedBuilder()
            .setTitle('Welcome to Café LycoReco!')
            .setDescription(`Please make sure to read our <#990527996043603971> page and for everything you need to know about our server, and gain access to our chats once you are ready!`)
            .setColor(member.client.config.color)
            .setImage([random(images)].toString())
            .setFooter({ text: `Customer Number: ${members}` });

        const guildId = member.guild.id
        const configSchema = member.client.configSchema

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData.length == 0) {
            const channelId = configSchemaData.map(item => item.welcomeChannelId).toString()
            const channel = member.client.channels.cache.get(channelId);
            channel.send({ content: `Hello ${member}! May we take your order?`, embeds: [welcomeEmbed] });
        }
        else {
            return;
        }
    }
}