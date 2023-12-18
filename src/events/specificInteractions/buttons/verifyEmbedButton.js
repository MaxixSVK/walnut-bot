const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const configSchema = interaction.client.configSchema
        const guild = interaction.guild;

        const configSchemaData = await configSchema.find({
            guildId: guild.id
        });

        if (!configSchemaData.length) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription('Config setup has not been completed, please contact server administrator')

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const member = guild.members.cache.get(interaction.user.id);
        const role = configSchemaData.map(item => item.unverifiedRoleId).toString()

        if (!member.roles.cache.has(role)) {
            const embed = new EmbedBuilder()
                .setTitle('Already verified')
                .setDescription('You are already verified on this server')
                .setColor('Orange')

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        const captchaModal = new ModalBuilder()
            .setCustomId('captchaModal')
            .setTitle('Captcha')

        const captchaInput = new TextInputBuilder()
            .setCustomId('captchaInput')
            .setLabel('Please enter captcha text')
            .setStyle(TextInputStyle.Short);

        const captchaInputRow = new ActionRowBuilder().addComponents(captchaInput);
        captchaModal.addComponents(captchaInputRow);

        await interaction.showModal(captchaModal);
    }
}