const { Events, ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === "CreateTicket") {
            const interactionuser = await interaction.guild.members.fetch(interaction.user.id)
            const username = interactionuser.user.username
            
            interaction.guild.channels.create({
                name: `Ticket-${username}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            })

            const ticketcreated = new EmbedBuilder()
            .setTitle("Your ticket has been created")
            .setDescription("Support will help you soon.")
            .setColor("Green")

            interaction.reply({ embeds: [ticketcreated], ephemeral: true });
        }
    }
};