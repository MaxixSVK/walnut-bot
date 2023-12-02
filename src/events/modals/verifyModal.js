const { Events, EmbedBuilder } = require('discord.js');
const verifySchema = require('../../schemas/verificationSchema');
const config = require('../../config.json');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'captchaModal') {

            const userImput = interaction.fields.getTextInputValue('captchaInput').toUpperCase();

            const data = await verifySchema.find({
                id: interaction.user.id
            });

            let captcha = data.map(item => item.captcha).toString()

            if (userImput == captcha) {
                const verifyEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('Verification completed')
                    .setDescription(`Enjoy your time on a server`)

                const guild = interaction.guild
                const verifyRole = guild.roles.cache.find(role => role.name === config.UnverifiedRole);
                const member = interaction.member;
                const memberId = interaction.user.id

                await verifySchema.deleteMany({ id: memberId })
                await member.roles.remove(verifyRole);
                interaction.reply({ embeds: [verifyEmbed], ephemeral: true })
            }
            else {
                const noverifyEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Verification was not completed')
                    .setDescription(`You entered wrong captcha please try again.`)

                interaction.reply({ embeds: [noverifyEmbed], ephemeral: true })
            }
        }
    }
}