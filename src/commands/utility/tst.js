const { SlashCommandBuilder } = require('discord.js');
const verifySchema = require('../../schemas/verify');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test-schema')
        .setDescription('Testing a schema')
        .addStringOption(option => option.setName('schema-input').setDescription('text to save').setRequired(true)),
    async execute(interaction) {

        const { options } = interaction;
        const string = options.getString('schema-input');

        const memberId = interaction.user.id

        await verifySchema.create({
            id: memberId,
            captcha: string
        });
        await interaction.reply(`I saved the data`);
    }
}