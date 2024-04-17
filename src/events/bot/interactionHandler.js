const { Events } = require('discord.js');
const path = require('path');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        let interactionFilePath;
        let directory;

        switch (true) {
            case interaction.isModalSubmit():
                directory = './../specificInteractions/modals';
                break;
            case interaction.isButton():
                directory = './../specificInteractions/buttons';
                break;
            case interaction.isStringSelectMenu():
                directory = './../specificInteractions/selectMenus';
                break;
            default:
                return;
        }

        const interactionName = interaction.customId;

        if (['rock', 'paper', 'scissors'].includes(interactionName)) {
            interactionFilePath = path.join(__dirname, './../specificInteractions/buttons', 'rps.js');
            // TODO: find a better solution for this
        } else {
            interactionFilePath = path.join(__dirname, directory, `${interactionName}.js`);
        }
        
        try {
            const command = require(interactionFilePath);
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing interaction: ${error}`);
        }
    }
};