const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const choices = ['rock', 'paper', 'scissors'];
        if (!choices.includes(interaction.customId)) return;

        const walnutChoice = choices[Math.floor(Math.random() * choices.length)];

        const embeds = {
            'rock': {
                'rock': { title: 'It\'s a draw', color: 'Orange' },
                'paper': { title: 'You lost', color: 'Red' },
                'scissors': { title: 'You won', color: 'Green' }
            },
            'paper': {
                'rock': { title: 'You won', color: 'Green' },
                'paper': { title: 'It\'s a draw', color: 'Orange' },
                'scissors': { title: 'You lost', color: 'Red' }
            },
            'scissors': {
                'rock': { title: 'You lost', color: 'Red' },
                'paper': { title: 'You won', color: 'Green' },
                'scissors': { title: 'It\'s a draw', color: 'Orange' }
            }
        };

        const userChoice = interaction.customId;
        const result = embeds[userChoice][walnutChoice];

        const resultEmbed = new EmbedBuilder()
            .setTitle(result.title)
            .setDescription(`Walnut has chosen ${walnutChoice}`)
            .setColor(result.color);

        interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    }
}