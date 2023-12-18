const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informations about Walnut'),
    async execute(interaction) {
        const client = interaction.client;

        const botEmbed = new EmbedBuilder()
            .setColor(client.config.color)
            .setTitle('Walnut')
            .setURL('https://github.com/MaxixSVK/walnut-bot')
            .setImage('https://i.imgur.com/NvxcmjO.png')
            .addFields(
                {
                    name: ':speech_balloon: Version:',
                    value: client.information.version,
                    inline: true
                },
                {
                    name: ':busts_in_silhouette: Author:',
                    value: 'maxix_sk',
                    inline: true
                },
            )
 
        await interaction.reply({ embeds: [botEmbed], ephemeral: true });
    },
};
