const { Events, EmbedBuilder } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'transcriptAndDeletetTicket') return;
        const guildId = interaction.guild.id
        const configSchema = interaction.client.configSchema

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData.length) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription('Please complete config setup first')

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const channelId = configSchemaData.map(item => item.transcriptChannelId).toString()
        const transcriptChannel = interaction.client.channels.cache.get(channelId);
        const ticketChannel = interaction.channel

        const attachment = await discordTranscripts.createTranscript(ticketChannel, { saveImages: true, poweredBy: false, });
        transcriptChannel.send({ content: `Transcript of ticket: ${ticketChannel.name}`, files: [attachment] });

        interaction.reply('Transcript saved, channel deletion in progress')

        ticketChannel.delete()
    }
}