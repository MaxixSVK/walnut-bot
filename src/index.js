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

require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

const GiveawaysManager = require('./giveaways')
client.giveawayManager = new GiveawaysManager(client, {
    default: {
        botsCanWin: false,
        embedColor: 'Aqua',
        embedColorEnd: 'Aqua',
        reaction: '🎉',
    },
});

client.login(process.env.token);