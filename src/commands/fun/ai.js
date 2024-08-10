const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv').config();

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
                .setColor('Red');
            return interaction.editReply({ embeds: [noPermsEmbed], ephemeral: true });
        }

        const prompt = interaction.options.getString('text');

        const openai = new OpenAI({ apiKey: process.env.openAiToken });

        const maxTokens = interaction.user.id === '694569759093817374' ? 1000 : 125;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a friendly discord bot named Walnut.' },
                    { role: 'user', content: prompt }
                ]
            });

            const answer = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;

            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('There was an error with your request\nSorry for the inconvenience')
                .setColor('Red');

            if (!answer || answer.length === 0) {
                return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
            }

            interaction.editReply(answer);
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('There was an error with your request\nSorry for the inconvenience')
                .setColor('Red');
            interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};