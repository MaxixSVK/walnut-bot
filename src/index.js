const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.commands = new Collection();

require('./db/dbConnect')();
require('./api/startApi')();

fs.readdirSync('./src/handlers').forEach((file) => {
    require(`./handlers/${file}`)(client);
});

client.login(process.env.token);
