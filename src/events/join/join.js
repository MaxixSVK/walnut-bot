const { Events, EmbedBuilder } = require('discord.js');

let lastImageIndex = 0;

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const configSchema = member.client.configSchema
        const guildId = member.guild.id

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData.length) return;

        const verifyRole = configSchemaData.map(item => item.unverifiedRoleId).toString()
        await member.roles.add(verifyRole);

        const images = [
            'https://i.imgur.com/Oatpx2O.png',
            'https://i.imgur.com/cWvOC3j.png',
            'https://i.imgur.com/HpJtbGy.png',
            'https://i.imgur.com/VR4Gsnp.png',
            'https://i.imgur.com/TAQjRHu.png',
            'https://i.imgur.com/NcgX2KS.png',
        ];


        const image = images[lastImageIndex];
        lastImageIndex = (lastImageIndex + 1) % images.length;

        const rulesAndInfoChannelId = configSchemaData.map(item => item.mainChannelId).toString()
        const members = member.guild.memberCount

        color = configSchemaData[0].color;

        const welcomeEmbed = new EmbedBuilder()
            .setTitle('Welcome to Café LycoReco!')
            .setDescription(`Please make sure to read our <#${rulesAndInfoChannelId}> page and for everything you need to know about our server, and gain access to our chats once you are ready!`)
            .setColor(color)
            .setImage(image)
            .setFooter({ text: `Customer Number: ${members}` });

        const channelId = configSchemaData.map(item => item.welcomeChannelId).toString()
        const channel = member.client.channels.cache.get(channelId);
        channel.send({ content: `Hello ${member}! May we take your order?`, embeds: [welcomeEmbed] });
    }
}