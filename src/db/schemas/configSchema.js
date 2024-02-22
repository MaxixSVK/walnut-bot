const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    guildId: String,
    disableNsfw: Boolean,
    mainChannelId: String,
    welcomeChannelId: String,
    transcriptChannelId: String,
    staffRoleId: String,
    unverifiedRoleId: String,
    color: String,
})

module.exports = mongoose.model('config', verifySchema)