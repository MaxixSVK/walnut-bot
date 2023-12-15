const configSchema = require('./../schemas/configSchema');
const information = require('../../package.json');
const config = require('../../config.json');

module.exports = (client) => {
    Object.assign(client, {
        configSchema,
        information,
        config
    });

    console.log('[INFO] Loaded config handler');
};