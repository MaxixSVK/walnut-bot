const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        if (!interaction.guild) return await interaction.reply({ content: 'Commands are only useable on Servers', ephemeral: true });
        
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`[WARNING] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            const errorembed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('ERROR')
                .setDescription(`There was an error while executing this command!\n Please contact the bot developer.`)

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorembed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorembed], ephemeral: true });
            }
        }
    }
};