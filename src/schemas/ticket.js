const { Schema, model } = require("mongoose")

let tiscketSchema = new Schema({
    userId: String,
    channelId: String,
    ticketTitle: String,
    ticketDsc: String,
    ticketNumber: Number,
})

module.exports = model("tic", tiscketSchema)