const { Events, EmbedBuilder, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const uniqid = require('uniqid');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit() || interaction.customId !== 'ticketModal') return;
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
        const walnutID = interaction.client.user.id;
        const ticketId = uniqid();
        const channelName = `ticket-${ticketId}`

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
        }).then(ticketChannel => {
            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('closeTicket')
                        .setLabel('Close ticket')
                        .setEmoji('✅')
                        .setStyle(ButtonStyle.Primary),
                )
            ticketChannel.send({ content: `<@${interaction.user.id}> has created ticket <@&${staffRoleId}>`, embeds: [ticketEmbed], components: [button] });
        });

        interaction.reply({ embeds: [ticketCreated], ephemeral: true });
    }
}