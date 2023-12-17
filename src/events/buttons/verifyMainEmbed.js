const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { CaptchaGenerator } = require('captcha-canvas');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'verifyMenuButton') return;
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
        const captchaImage = new AttachmentBuilder(buffer, { name: 'captcha.png' })

        const firstembed = new EmbedBuilder()
            .setTitle('Solve this captcha to gain acces to LycoReco Café!')
            .setColor('#E51468')
            .setImage(`attachment://captcha.png`)

        const verifySchema = interaction.client.verifySchema

        const verifySchemaData = await verifySchema.find({
            guildId: guild.id,
            id: interaction.user.id
        });

        const memberId = interaction.user.id

        if (verifySchemaData.length) {
            await verifySchema.deleteMany({
                guildId: guild.id,
                id: memberId
            })
        }

        await verifySchema.create({
            guildId: guild.id,
            id: memberId,
            captcha: captcha.text
        });

        interaction.reply({ embeds: [firstembed], files: [captchaImage], components: [button], ephemeral: true })
    }
}