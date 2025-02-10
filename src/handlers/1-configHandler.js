const configSchema = require('./../db/schemas/configSchema');
const giveawaySchema = require('./../db/schemas/giveawaySchema')
const information = require('../../package.json');

module.exports = (client) => {
    Object.assign(client, {
        configSchema,
        giveawaySchema,
        information,
    });

    console.log('[INFO] Loaded config handler');
};