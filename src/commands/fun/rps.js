const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play rock paper scissors with Walnut'),
    async execute(interaction) {
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setEmoji('🪨')
                    .setStyle(ButtonStyle.Secondary),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setEmoji('📰')
                    .setStyle(ButtonStyle.Secondary)

            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setEmoji('✂️')
                    .setStyle(ButtonStyle.Secondary)
            );

        const configSchema = interaction.client.configSchema
        let color = '#5865f2';

        if (interaction.guild) {
            const guildId = interaction.guild.id

            const configSchemaData = await configSchema.find({
                guildId: guildId
            });

            if (configSchemaData.length > 0 && configSchemaData[0].color) {
                color = configSchemaData[0].color;
            }
        }

        const embed = new EmbedBuilder()
            .setTitle(`Let's play RPS`)
            .setDescription('Now you can play rock paper scissors with Walnut')
            .setColor(color)

        await interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
    },
};