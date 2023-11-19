const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === "captchaModal") {
            const userImput = interaction.fields.getTextInputValue('captchaInput');

            if (userImput == "test") {//TODO
                const verifyEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle("Verification completed")
                    .setDescription(`Enjoy your time on a server`)

                const guild = interaction.guild
                const verifyRole = guild.roles.cache.find(role => role.name === 'unverified');
                const member = interaction.member;

                await member.roles.remove(verifyRole);
                interaction.reply({ embeds: [verifyEmbed], ephemeral: true })
            }
            else {
                const noverifyEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Verification was not completed")
                    .setDescription(`You entered wrong captcha please try again.`)

                interaction.reply({ embeds: [noverifyEmbed], ephemeral: true })
            }
        }
    }
}