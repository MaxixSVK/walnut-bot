const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        
        const walnut = ["rock", "paper", "scissors",];
        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        let walnutFinal = [random(walnut)].toString()

        const winnerEmbed = new EmbedBuilder()
            .setTitle("You won")
            .setDescription(`Congratulation, Walnut has chosen a ${walnutFinal}`)
            .setColor("Green")

        const looserEmbed = new EmbedBuilder()
            .setTitle("You lost")
            .setDescription(`Walnut has chosen a ${walnutFinal}`)
            .setColor("Red")

        const drawEmbed = new EmbedBuilder()
            .setTitle("It's a draw")
            .setDescription(`Walnut has chosen a ${walnutFinal}`)
            .setColor("Orange")

        if (interaction.customId == 'rock') {
            if (walnutFinal == "rock") {
                interaction.reply({ embeds: [drawEmbed], ephemeral: true })
            }
            if (walnutFinal == "paper") {
                interaction.reply({ embeds: [looserEmbed], ephemeral: true })
            }
            if (walnutFinal == "scissors") {
                interaction.reply({ embeds: [winnerEmbed], ephemeral: true })
            }
        }

        if (interaction.customId == 'paper') {
            if (walnutFinal == "rock") {
                interaction.reply({ embeds: [winnerEmbed], ephemeral: true })
            }
            if (walnutFinal == "paper") {
                interaction.reply({ embeds: [drawEmbed], ephemeral: true })
            }
            if (walnutFinal == "scissors") {
                interaction.reply({ embeds: [looserEmbed], ephemeral: true })
            }

        }

        if (interaction.customId == 'scissors') {
            if (walnutFinal == "rock") {
                interaction.reply({ embeds: [looserEmbed], ephemeral: true })
            }
            if (walnutFinal == "paper") {
                interaction.reply({ embeds: [winnerEmbed], ephemeral: true })
            }
            if (walnutFinal == "scissors") {
                interaction.reply({ embeds: [drawEmbed], ephemeral: true })
            }
        }
    }
};