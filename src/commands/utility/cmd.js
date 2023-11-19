const { SlashCommandBuilder } = require('discord.js');
const verifySchema = require('../../schemas/verify');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('read-schema')
        .setDescription('Testing a schema'),
    async execute(interaction) {

        const data = await verifySchema.find({
            id: interaction.user.id
        });

        if (data.length == 0){
            console.log("1")
        }
        else {
            console.log("2")
        }

        console.log(data.length)
        interaction.reply("Ok")
    }
}