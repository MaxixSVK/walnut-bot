const { Events, EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs').promises;

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu() || interaction.customId !== 'setupMenu') return;

        async function createEmbed(title, description, image) {
            const embed = new EmbedBuilder()
                .setColor(interaction.client.config.color)
                .setTitle(title)
                .setDescription(description);

            if (image) {
                embed.setImage(image);
            }
            return embed;
        }

        const noDataEmebed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Unavailable')
            .setDescription(`Sorry, this section is currently unavailable,\n It will be updated with new information over time`)

        switch (interaction.values[0]) {
            case 'server':
                await interaction.update(interaction)

                const serverTxtData = await fs.readFile(path.join(__dirname, 'strings/server.txt'), 'utf8');
                const serverImgEmbed = await createEmbed(null, null, 'https://i.imgur.com/VrqxmXm.png');
                const ServerTxtEmbed = await createEmbed('About us', serverTxtData);

                interaction.followUp({ embeds: [serverImgEmbed, ServerTxtEmbed], ephemeral: true });
                break;

            case 'strike':
                await interaction.update(interaction)
                const strikeTxtData = await fs.readFile(path.join(__dirname, 'strings/strike.txt'), 'utf8');
                const strikeTxtEmbed = await createEmbed('About us', strikeTxtData);

                interaction.followUp({ embeds: [strikeTxtEmbed], ephemeral: true })
                break;

            case 'staff':
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [noDataEmebed], ephemeral: true })
                break;

            case 'servers':
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [noDataEmebed], ephemeral: true })
                break;

            case 'partnership':
                await interaction.update(interaction)
                const partnershipTxtData = await fs.readFile(path.join(__dirname, 'strings/affiliation.txt'), 'utf8');
                const partnershipImgEmbed = await createEmbed(null, null, 'https://i.imgur.com/TvwOxUH.png');
                const partnershipTxtEmbed = await createEmbed('Affiliations', partnershipTxtData);

                interaction.followUp({ embeds: [partnershipImgEmbed, partnershipTxtEmbed], ephemeral: true });
                break;

            case 'xp':
                await interaction.update(interaction)
                await interaction.followUp({ embeds: [noDataEmebed], ephemeral: true })
                break;
        }
    }
}