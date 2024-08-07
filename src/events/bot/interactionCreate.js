const { Events, EmbedBuilder, WebhookClient } = require('discord.js');
const webhook = new WebhookClient({ url: process.env.webhook_logs_url });

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`[WARNING] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`[ERROR] [${new Date().toLocaleString()}] An error occurred while executing the command ${interaction.commandName} \n[ERROR] ${error}`);
            console.error(error.stack);

            const errorembed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('ERROR')
                .setDescription(`There was an error while executing this command!\n Please contact the bot developer: maxix_sk.\n Attempting to restart the bot due to an error...`);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorembed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorembed], ephemeral: true });
            }

            const webhookembed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('ERROR')
                .setDescription(error.message || 'An error occurred while executing the command.') 
                .setFields(
                    { name: 'Command', value: interaction.commandName.toString() },
                    { name: 'User', value: interaction.user.tag.toString() },
                    { name: 'Guild', value: interaction.guild ? interaction.guild.name.toString() : 'Direct Message' },
                    { name: 'Channel', value: interaction.channel ? interaction.channel.name.toString() : 'Unknown' },
                    { name: 'Actions', value: 'Attempting to restart...' }
                )
                .setTimestamp();

            await webhook.send({ embeds: [webhookembed] });

            console.error('[ERROR] Restarting the bot due to an error...');
            process.exit(1);
        }
    }
};