const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'closeTicket') {
            const guild = interaction.guild;
            const member = guild.members.cache.get(interaction.user.id);
            const staffRoleID = interaction.client.config.staffRole;
            const walnutID = interaction.client.user.id;

            if (member.roles.cache.has(staffRoleID)) {

                interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: staffRoleID,
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
            else {
                const permsEmbed = new EmbedBuilder()
                    .setTitle('No permissions')
                    .setDescription('You don\'t have permission to close this ticket')
                    .setColor('Red')

                await interaction.reply({ embeds: [permsEmbed], ephemeral: true })
            }
        }
    }
}