const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ]
});
client.commands = new Collection();

fs.readdirSync('./src/handlers').forEach((file) => {
    require(`./handlers/${file}`)(client);
});

client.login(process.env.token);