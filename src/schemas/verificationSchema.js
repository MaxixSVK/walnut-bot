const { Schema, model } = require('mongoose');

const verifySchema = new Schema({
    id: String,
    captcha: String,
})

module.exports = model('verification', verifySchema)