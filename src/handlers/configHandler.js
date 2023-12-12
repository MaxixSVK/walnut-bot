const information = require('./../../package.json');
const config = require('./../../config.json');

module.exports = (client) => {
    client.config = config;
    client.information = information;
    
    console.log('[INFO] Loaded config handler');
};