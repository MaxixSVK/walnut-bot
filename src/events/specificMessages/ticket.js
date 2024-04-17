const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(message) {
        //TODO - db channel and color, then more info in embed - then enable it in messageCreate.js
        let color = '#5865f2';

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Ticket log - alpha version')
            .setDescription(message.content)

        const channelID = '1041601281191596062';
        const channel = message.client.channels.cache.get(channelID);

        channel.send({ embeds: [embed] });
    }
}