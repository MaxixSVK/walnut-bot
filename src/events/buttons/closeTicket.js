const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'closeTicket') return;
        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

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

        const staffRoleId = configSchemaData.map(item => item.staffRoleId).toString()
        const guild = interaction.guild;
        const member = guild.members.cache.get(interaction.user.id);
        const walnutID = interaction.client.user.id;

        if (!member.roles.cache.has(staffRoleId)) {
            const permsEmbed = new EmbedBuilder()
                .setTitle('No permissions')
                .setDescription('You don\'t have permission to close this ticket')
                .setColor('Red')

            return interaction.reply({ embeds: [permsEmbed], ephemeral: true })
        }

        interaction.channel.permissionOverwrites.set([
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: staffRoleId,
                allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: walnutID,
                allow: [PermissionsBitField.Flags.ViewChannel],
            },
        ]);

        const deleteEmbed = new EmbedBuilder()
            .setTitle('Ticket has been closed')
            .setDescription('Now only staff team can see this ticket')
            .setColor('Red')

        const deleteButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('transcriptAndDeletetTicket')
                    .setLabel('Make a Transcript and Delete Ticket')
                    .setEmoji('✅')
                    .setStyle(ButtonStyle.Primary),
            )

        await interaction.reply({ embeds: [deleteEmbed], components: [deleteButton] })
    }
}