const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(message) {
        const configSchema = message.client.configSchema;
        const guildId = message.guild.id;

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData[0].ticketLogChannelId) {
            return;
        }

        if (configSchemaData[0].ticketLogChannelId === message.channel.id) return;

        let description = 'Message sent: ' + (message.content || 'No text content');
        let imageUrl = null;

        if (message.attachments.size > 0) {
            imageUrl = message.attachments.first().url;
            description += '\nImage sent: ' + imageUrl;
        }
        
        description += '\n[Jump to message](' + message.url + ')';

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(message.channel.name)
            .setDescription(description)
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        if (imageUrl) {
            embed.setImage(imageUrl);
        }

        const channel = message.client.channels.cache.get(configSchemaData[0].ticketLogChannelId);

        channel.send({ embeds: [embed] });
    }
}