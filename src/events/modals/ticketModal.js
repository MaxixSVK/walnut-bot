const { Events, EmbedBuilder, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const config = require('../../config.json');
const uniqid = require('uniqid');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'ticketModal') {
            const staffRoleID = interaction.guild.roles.cache.find(role => role.name == config.StaffRole);
            const walnutRoleID = interaction.guild.roles.cache.find(role => role.name == config.Walnutrole);
            const ticketId = uniqid();
            const channelName = `ticket-${ticketId}`

            interaction.guild.channels.create({
                name: channelName,
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
                        id: staffRoleID,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: walnutRoleID,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            })

            const titleImput = interaction.fields.getTextInputValue('titTicketleInput');
            const dscImput = interaction.fields.getTextInputValue('dscTicketInput');


            const ticketCreated = new EmbedBuilder()
                .setTitle('Your ticket has been created')
                .setDescription('Staff team will get in touch with you soon.')
                .setColor('Green')

            const ticketEmbed = new EmbedBuilder()
                .setTitle('The ticket has been created')
                .setColor(config.Color)
                .addFields(
                    { name: 'Ticket\'s name:', value: titleImput, inline: false },
                    { name: 'Ticket\'s description:', value: dscImput, inline: false },
                    { name: 'Ticket ID:', value: ticketId, inline: false },
                    
                )

            setTimeout(() => {
                const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('closeTicket')
                        .setLabel('Close ticket')
                        .setEmoji('✅')
                        .setStyle(ButtonStyle.Primary),
                )
                const ticketChannel = interaction.guild.channels.cache.find(channel => channel.name == channelName);
                ticketChannel.send({ content: `<@${interaction.user.id}> has created ticket ${staffRoleID}`, embeds: [ticketEmbed], components: [button] });
            }, 3000);

            interaction.reply({ embeds: [ticketCreated], ephemeral: true });
        }
    }
}

