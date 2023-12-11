const { Events } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'transcriptAndDeletetTicket') {
            const ticketChannel = interaction.channel
            const transcriptChannel = interaction.guild.channels.cache.get(interaction.client.config.transcriptChannel);

            const attachment = await discordTranscripts.createTranscript(ticketChannel, {saveImages: true, poweredBy: false,});
            transcriptChannel.send({ content: `Transcript of ticket: ${ticketChannel.name}`, files: [attachment] });

            interaction.reply('Transcript saved, channel deletion in progress')
            
            ticketChannel.delete()
        }
    }
}