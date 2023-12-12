const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ]
});
client.commands = new Collection();

require('./handlers/handler')(client);

client.login(process.env.token);