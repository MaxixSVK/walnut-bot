const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    async execute(interaction) {
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
        if (!transcriptChannel) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription('Error while trying to send message\nPlease make sure you have setup the main channel in coning setup correctly')

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const permissions = transcriptChannel.permissionsFor(interaction.client.user);
        if (!permissions.has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel])) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error - while making a trasncript')
                .setDescription('I do not have propper permission in this channel\nPlease make sure I have permission to send messages and view this channel')
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (!permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error - while deleting a ticket')
                .setDescription('I do not have propper permissions to delete this channel\nPlease make sure I have permission to manage channels')
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const ticketChannel = interaction.channel
        const attachment = await discordTranscripts.createTranscript(ticketChannel, { saveImages: true, poweredBy: false, });
        transcriptChannel.send({ content: `Transcript of ticket: ${ticketChannel.name}`, files: [attachment] });

        interaction.reply('Transcript saved, channel deletion in progress')
        ticketChannel.delete()
    }
}