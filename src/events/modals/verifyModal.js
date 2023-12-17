const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit() || interaction.customId !== 'captchaModal') return;
        const verifySchema = interaction.client.verifySchema
        const guildId = interaction.guild.id

        const verifySchemaData = await verifySchema.find({
            guildId: guildId,
            id: interaction.user.id
        });

        const userImput = interaction.fields.getTextInputValue('captchaInput').toUpperCase();
        const captcha = verifySchemaData.map(item => item.captcha).toString()

        if (userImput !== captcha) {
            const noverifyEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Verification was not completed')
                .setDescription('You entered wrong captcha please try again.')

            return interaction.reply({ embeds: [noverifyEmbed], ephemeral: true })
        }

        const configSchema = interaction.client.configSchema
        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        if (!configSchemaData.length) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error')
                .setDescription('Config setup has not been completed, please contact server administrator')

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const verifyRole = configSchemaData.map(item => item.unverifiedRoleId).toString()
        const member = interaction.member;
        const memberId = interaction.user.id;

        await verifySchema.deleteMany({
            guildId: guildId,
            id: memberId
        })

        await member.roles.remove(verifyRole);

        const verifyEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Verification completed')
            .setDescription('Enjoy your time on a server')

        interaction.reply({ embeds: [verifyEmbed], ephemeral: true })
    }
}