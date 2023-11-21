const { Events, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === "ticketModal") {
            const interactionuser = await interaction.guild.members.fetch(interaction.user.id)
            const username = interactionuser.user.username
            const roleId = interaction.guild.roles.cache.find(role => role.name == "ticket-staff");
            const channelName = `ticket-${username}`

            interaction.guild.channels.create({
                name: `ticket-${username}`,
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
                    {
                        id: roleId,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            })

            const titleImput = interaction.fields.getTextInputValue('titTicketleInput');
            const dscImput = interaction.fields.getTextInputValue('dscTicketInput');


            const ticketCreated = new EmbedBuilder()
                .setTitle("Your ticket has been created")
                .setDescription("staff team will get in touch with you soon.")
                .setColor("Green")
            
            const ticketEmbed = new EmbedBuilder()
            .setTitle(titleImput)
            .setDescription(dscImput)
            .setColor(config.Color)

            setTimeout(() => {
                const ticketChannel = interaction.guild.channels.cache.find(channel => channel.name == channelName);
                ticketChannel.send({ content: `<@${interaction.user.id}> has created ticket <@&1176584982416863273>`, embeds: [ticketEmbed] });
            }, 3000);

            interaction.reply({ embeds: [ticketCreated], ephemeral: true });
        }
    }
}

