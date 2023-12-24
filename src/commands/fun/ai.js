const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Chat with Walnut')
        .addStringOption(option => option
            .setName('text')
            .setDescription('What you want to say to Walnut')
            .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        if (interaction.user.id !== '694569759093817374') { 
            const noPermsEmbed = new EmbedBuilder()
                .setTitle('No Permission')
                .setDescription('You do not have permission to use this command.')
                .setColor('Red')
            return interaction.editReply({ embeds: [noPermsEmbed], ephemeral: true}); }

        const prompt = interaction.options.getString('text');

        const openai = new OpenAI({ apiKey: process.env.openAiToken });

        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `I am friendly discord bot Walnut and user is chating with you: ${prompt}`,
            temperature: 0,
            max_tokens: 125,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,   
        });

        const answer = response.choices[0].text;
        try {
            interaction.editReply(answer);
        }
        catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('There was an error with your request\nSorry for the inconvenience')
                .setColor('Red')

                interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};