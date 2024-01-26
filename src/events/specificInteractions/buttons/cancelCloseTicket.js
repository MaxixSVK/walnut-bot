const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const informationEmbed = new EmbedBuilder()
            .setTitle('Information')
            .setDescription('This ticket will not be closed.')
            .setColor('Green')

        await interaction.update({ embeds: [informationEmbed], components: [] })
    }
}