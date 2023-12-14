const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventFolders = fs.readdirSync(eventsPath);

    for (const eventFolder of eventFolders) {
        const eventPath = path.join(eventsPath, eventFolder);
        const eventFiles = fs.readdirSync(eventPath).filter((file) => file.endsWith('.js'));
        for (const file of eventFiles) {
            const eventFilePath = path.join(eventPath, file);
            const event = require(eventFilePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
    console.log('[INFO] Loaded event handler');
};
