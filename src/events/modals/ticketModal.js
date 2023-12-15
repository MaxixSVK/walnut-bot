const { Events, EmbedBuilder, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const uniqid = require('uniqid');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'ticketModal') {
            const guildId = interaction.guild.id
            const configSchema = interaction.client.configSchema

            const configSchemaData = await configSchema.find({
                guildId: guildId
            });

            if (!configSchemaData.length == 0) {
                const staffRoleId = configSchemaData.map(item => item.staffRoleId).toString()
                const walnutID = interaction.client.user.id;
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
                            id: staffRoleId,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: walnutID,
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
                    .setColor(interaction.client.config.color)
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
                    ticketChannel.send({ content: `<@${interaction.user.id}> has created ticket <@&${staffRoleId}>`, embeds: [ticketEmbed], components: [button] });
                }, 3000);

                interaction.reply({ embeds: [ticketCreated], ephemeral: true });
            }
            else {
                return interaction.reply({ content: 'Please complete setup first', ephemeral: true });
            }

        }
    }
}

