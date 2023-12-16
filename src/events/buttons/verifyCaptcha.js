const { Events, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'verifyEmbedButton') {
            const guild = interaction.guild;
            const member = guild.members.cache.get(interaction.user.id);
            const guildId = member.guild.id
            const configSchema = member.client.configSchema

            const configSchemaData = await configSchema.find({
                guildId: guildId
            });

            if (!configSchemaData.length == 0) {
                const role = configSchemaData.map(item => item.unverifiedRoleId).toString()
                if (member.roles.cache.has(role)) {
                    const captchaModal = new ModalBuilder()
                        .setCustomId('captchaModal')
                        .setTitle('Captcha')

                    const captchaInput = new TextInputBuilder()
                        .setCustomId('captchaInput')
                        .setLabel('Please enter captcha text')
                        .setStyle(TextInputStyle.Short);

                    const actionRow = new ActionRowBuilder().addComponents(captchaInput);
                    captchaModal.addComponents(actionRow);
                    await interaction.showModal(captchaModal);
                }
                else {
                    const embed = new EmbedBuilder()
                        .setTitle('Already verified')
                        .setDescription('You are already verified on this server')
                        .setColor('Orange')

                    interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }
            else {
                return interaction.reply({ content: 'Setup has not been completed', ephemeral: true });
            }
        }
    }
}