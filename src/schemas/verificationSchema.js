const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    guildId: String,
    id: String,
    captcha: String,
})

module.exports = mongoose.model('verification', verifySchema)