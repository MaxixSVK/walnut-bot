const configSchema = require('./../schemas/configSchema');
const verifySchema = require('./../schemas/verificationSchema');
const information = require('../../package.json');
const config = require('../../config.json');

module.exports = (client) => {
    Object.assign(client, {
        configSchema,
        verifySchema,
        information,
        config
    });

    console.log('[INFO] Loaded config handler');
};