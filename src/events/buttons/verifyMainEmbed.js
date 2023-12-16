const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { CaptchaGenerator } = require('captcha-canvas');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'verifyMenuButton') {
            const guild = interaction.guild;
            const member = guild.members.cache.get(interaction.user.id);
            const configSchema = member.client.configSchema

            const configSchemaData = await configSchema.find({
                guildId: guild.id
            });

            if (!configSchemaData.length == 0) {
                const role = configSchemaData.map(item => item.unverifiedRoleId).toString()
                if (member.roles.cache.has(role)) {

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

                    const verifySchema = member.client.verifySchema

                    const data = await verifySchema.find({
                        guildId: guild.id,
                        id: interaction.user.id
                    });

                    const memberId = interaction.user.id
                    if (!data.length == 0) {
                        await verifySchema.deleteMany({ id: memberId })
                        await verifySchema.create({
                            guildId: guild.id,
                            id: memberId,
                            captcha: captcha.text
                        });
                    }
                    else {
                        await verifySchema.create({
                            guildId: guild.id,
                            id: memberId,
                            captcha: captcha.text
                        });
                    }

                    interaction.reply({ embeds: [firstembed], files: [captchaImage], components: [button], ephemeral: true })
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