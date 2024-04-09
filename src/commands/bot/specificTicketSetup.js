const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('specific-ticket-setup')
        .setDescription('Setup ticket embeds for specific channel')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel where the ticket embeds will be setup')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const permissions = channel.permissionsFor(interaction.client.user);

        if (!permissions.has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel])) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Error - while sending message')
                .setDescription('I do not have propper permission in this channel\nPlease make sure I have permission to send messages and view this channel')
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const configSchema = interaction.client.configSchema
        const guildId = interaction.guild.id

        const configSchemaData = await configSchema.find({
            guildId: guildId
        });

        let color = '#5865f2';

        if (configSchemaData.length > 0 && configSchemaData[0].color) {
            color = configSchemaData[0].color;
        }

        const ticketEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Need help? Contact our staff here.')
            .setDescription('Please only create a ticket for serious use only.');

        const ticketButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket')
                    .setLabel('Create Ticket')
                    .setEmoji('📩')
                    .setStyle(ButtonStyle.Primary),
            )

        await channel.send({ embeds: [ticketEmbed], components: [ticketButtons] });
        return interaction.reply({ content: 'Setup completed', ephemeral: true});
    },
};
