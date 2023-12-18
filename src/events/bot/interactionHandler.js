const { Events } = require('discord.js');
const path = require('path');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        let interactionFilePath;
        let directory;

        if (interaction.isModalSubmit()) {
            directory = './specificInteractions/modals';
        } else if (interaction.isButton()) {
            directory = './specificInteractions/buttons';
        } else if (interaction.isStringSelectMenu()) {
            directory = './specificInteractions/selectMenus';
        } else {
            return;
        }

        const interactionName = interaction.customId;

        if (['rock', 'paper', 'scissors'].includes(interactionName)) {
            interactionFilePath = path.join(__dirname, './specificInteractions/buttons', 'rps.js');
            // TODO: find a better solution for this
        } else {
            interactionFilePath = path.join(__dirname, directory, `${interactionName}.js`);
        }
        
        console.log(interactionFilePath)
        
        const command = require(interactionFilePath);
        command.execute(interaction);
    }
};