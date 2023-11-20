const { Events, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { CaptchaGenerator } = require("captcha-canvas");
const verifySchema = require('../schemas/verify');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        /*
        Verify button on main embed
        creates captcha and saves it to MongoDB
        */
        if (interaction.customId === 'verifyMenuButton') {

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('verifyEmbedButton')
                        .setLabel('Start verification')
                        .setEmoji('994615569833791498')
                        .setStyle(ButtonStyle.Primary),
                )

            const captcha = new CaptchaGenerator()
            const buffer = captcha.generateSync();
            const captchaImage = new AttachmentBuilder(buffer, { name: "captcha.png" })

            const firstembed = new EmbedBuilder()
                .setTitle("Solve this captcha to gain acces to LycoReco Café!")
                .setColor("#E51468")
                .setImage(`attachment://captcha.png`)

            const data = await verifySchema.find({
                id: interaction.user.id
            });

            const memberId = interaction.user.id
            if (!data.length == 0) {
                await verifySchema.deleteMany({ id: memberId })
                await verifySchema.create({
                    id: memberId,
                    captcha: captcha.text
                });
            }
            else {
                await verifySchema.create({
                    id: memberId,
                    captcha: captcha.text
                });
            }

            interaction.reply({ embeds: [firstembed], files: [captchaImage], components: [button], ephemeral: true })
        }

        /*
        Verify button on captcha embed
        creates modal
        */
        if (interaction.customId === "verifyEmbedButton") {
            const captchaModal = new ModalBuilder()
                .setCustomId('captchaModal')
                .setTitle('Captcha')

            const captchaInput = new TextInputBuilder()
                .setCustomId('captchaInput')
                .setLabel("Please enter captcha text")
                .setStyle(TextInputStyle.Short);

            const actionRow = new ActionRowBuilder().addComponents(captchaInput);
            captchaModal.addComponents(actionRow);
            await interaction.showModal(captchaModal);
        }

        //replies for rps
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