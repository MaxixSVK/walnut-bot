const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informations about Walnut'),
    async execute(interaction) {
        const client = interaction.client;
        const configSchema = interaction.client.configSchema

        let color = '#5865f2';

        if (interaction.guild) {
            const guildId = interaction.guild.id

            const configSchemaData = await configSchema.find({
                guildId: guildId
            });

            if (configSchemaData.length > 0 && configSchemaData[0].color) {
                color = configSchemaData[0].color;
            }
        }

        const botEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Walnut')
            .setURL('https://github.com/MaxixSVK/walnut-bot')
            .setImage('https://i.imgur.com/mRVTlKf.jpeg')
            .addFields(
            {
                name: ':speech_balloon: Version:',
                value: client.information.version,
                inline: true
            },
            {
                name: ':busts_in_silhouette: Author',
                value: 'maxix_sk',
                inline: true
            },
            {
                name: ':art: Art (pfp)',
                value: 'serissaarts',
                inline: true
            },
            )

        await interaction.reply({ embeds: [botEmbed], ephemeral: true });
    },
};
