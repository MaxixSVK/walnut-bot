const configSchema = require('./../db/schemas/configSchema');
const verifySchema = require('./../db/schemas/verificationSchema');
const giveawaySchema = require('./../db/schemas/giveawaySchema')
const information = require('../../package.json');
const config = require('../../config.json');

module.exports = (client) => {
    Object.assign(client, {
        configSchema,
        verifySchema,
        giveawaySchema,
        information,
        config
    });

    console.log('[INFO] Loaded config handler');
};