const { Events, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        if (client.config.commandsListOnStartup) {
            console.log('[INFO] Loaded commands:')
            console.log('----------------------------------')
            const folders = fs.readdirSync(path.join(__dirname, '../../commands'));

            for (const folderjs of folders) {
                const filesjslog = fs.readdirSync(path.join(__dirname, '../../commands/') + folderjs).filter(file => file.endsWith('.js'));
                console.log(folderjs.toUpperCase())
                console.log(filesjslog.toString().replaceAll('.js', ' ').replaceAll(',', ''))
            }
            console.log('----------------------------------')
        }

        mongoose.connect(process.env.MongoDB);
        const db = mongoose.connection;
        
        db.on('error', console.error.bind(console, '[INFO] Couldn\'t connect to MongoDB\n'));
        db.once('open', () => {
            console.log('[INFO] Connected to MongoDB');
            console.log('successfully finished startup');
        });

        console.log(`[INFO] Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{
                name: client.config.customStatus,
                type: ActivityType.Custom
            }],
            status: 'online'
        });
    }
};