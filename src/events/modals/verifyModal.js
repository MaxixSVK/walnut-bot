const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'captchaModal') {
            const verifySchema = interaction.client.verifySchema

            const userImput = interaction.fields.getTextInputValue('captchaInput').toUpperCase();

            const data = await verifySchema.find({
                id: interaction.user.id
            });

            let captcha = data.map(item => item.captcha).toString()

            if (userImput == captcha) {
                const verifyEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('Verification completed')
                    .setDescription('Enjoy your time on a server')

                const configSchema = interaction.client.configSchema
                const guildId = interaction.guild.id

                const configSchemaData = await configSchema.find({
                    guildId: guildId
                });

                const verifyRole = configSchemaData.map(item => item.unverifiedRoleId).toString()
                const member = interaction.member;
                const memberId = interaction.user.id;

                await verifySchema.deleteMany({ 
                    guildId: guildId,
                    id: memberId 
                })
                await member.roles.remove(verifyRole);
                interaction.reply({ embeds: [verifyEmbed], ephemeral: true })
            }
            else {
                const noverifyEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Verification was not completed')
                    .setDescription('You entered wrong captcha please try again.')

                interaction.reply({ embeds: [noverifyEmbed], ephemeral: true })
            }
        }
    }
}