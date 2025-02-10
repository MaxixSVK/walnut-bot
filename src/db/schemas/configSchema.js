const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    guildId: String,
    disableNsfw: Boolean,
    mainChannelId: String,
    welcomeChannelId: String,
    transcriptChannelId: String,
    ticketLogChannelId: String,
    staffRoleId: String,
    color: String,
})

module.exports = mongoose.model('config', configSchema)