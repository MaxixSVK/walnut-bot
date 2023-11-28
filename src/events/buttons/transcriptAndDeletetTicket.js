const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const config = require("../../config.json");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === "transcriptAndDeletetTicket") {
            const ticketChannel = interaction.channel
            const transcriptChannel = interaction.guild.channels.cache.find(channel => channel.name == config.transcriptChannel);

            const attachment = await discordTranscripts.createTranscript(ticketChannel, {saveImages: true, poweredBy: false,});
            transcriptChannel.send({ content: `Transcript of ticket: ${ticketChannel.name}`, files: [attachment] });

            interaction.reply("Transcript saved, channel deletion in progress")
            
            ticketChannel.delete()
        }
    }
}