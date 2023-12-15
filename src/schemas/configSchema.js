const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    guildId: String,
    mainChannelId: String,
    welcomeChannelId: String,
    transcriptChannelId: String,
})

module.exports = mongoose.model('config', verifySchema)