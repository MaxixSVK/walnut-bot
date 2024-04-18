const { Events } = require('discord.js');
const path = require('path');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        let directory, file;

        switch (true) {
            case /ticket-\w+/.test(message.channel.name):
                directory = './../specificMessages/';
                file = 'ticket.js';
                break;
            default:
                return;
        }

        const messageFilePath = path.join(__dirname, directory, file);

        try {
            const command = require(messageFilePath);
            await command.execute(message);
        } catch (error) {
            console.error(`Error executing message command: ${error}`);
        }
    }
};