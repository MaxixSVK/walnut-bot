const { Events, ActivityType } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`[INFO] Logged in as ${client.user.tag}`);
        
        client.user.setPresence({
            activities: [{
                name: client.config.customStatus,
                type: ActivityType.Custom
            }],
            status: 'online'
        });
        console.log('successfully finished startup');
    }
};