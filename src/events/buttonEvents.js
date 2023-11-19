const { Events, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { CaptchaGenerator } = require("captcha-canvas");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

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

            interaction.reply({ embeds: [firstembed], files: [captchaImage], components: [button], ephemeral: true })
            console.log(captcha.text)

        }

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
    }
};