const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [{
                name: "Hacking DA",
                type: ActivityType.Custom
            }],
            status: 'online'
        });

        console.log(`[INFO] Logged in as ${client.user.tag}`);
    }
};