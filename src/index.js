const { Client, GatewayIntentBits, Collection } = require('discord.js');
const information = require('./../package.json');
const config = require('./config.json');
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.config = config;
client.information = information;
client.commands = new Collection();

require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

client.login(process.env.token);