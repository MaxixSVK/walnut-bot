const { Schema, model } = require("mongoose")

let verifySchema = new Schema({
    id: String,
    captcha: String,
})

module.exports = model("ver", verifySchema)