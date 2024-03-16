const configSchema = require('./../db/schemas/configSchema');
const verifySchema = require('./../db/schemas/verificationSchema');
const giveawaySchema = require('./../db/schemas/giveawaySchema')
const information = require('../../package.json');

module.exports = (client) => {
    Object.assign(client, {
        configSchema,
        verifySchema,
        giveawaySchema,
        information,
    });

    console.log('[INFO] Loaded config handler');
};