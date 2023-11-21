const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("Generates a random LycoReco GIF"),
    async execute(interaction) {
        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const images = [
            'https://media.tenor.com/NzGpGWRN7MwAAAAC/nishikigi-chisato.gif',
            'https://media.tenor.com/W3wUoMhulrwAAAAC/lycoris-recoil-lycoris.gif',
            'https://media.tenor.com/s7MbaG16nDIAAAAC/lycoris-recoil-%E3%83%AA%E3%82%B3%E3%83%AA%E3%82%B9%E3%83%AA%E3%82%B3%E3%82%A4%E3%83%AB.gif',
            'https://media.tenor.com/zEKmG9Tc0C0AAAAC/lycoris-recoil.gif',
            'https://media.tenor.com/I4agzayzaXIAAAAC/lycoris-recoil-chisato.gif',
            'https://media.tenor.com/LllLP-d1YfAAAAAd/lycoris-recoil.gif',
            'https://media.tenor.com/2ysCn6BCcAsAAAAC/lycoris-recoil.gif',
            'https://media.tenor.com/UXEHyHzR2moAAAAC/lycoris-recoil-nishikigi-chisato.gif',
            'https://media.tenor.com/SCo7LfX56YEAAAAC/lycoris-recoil.gif',
        ];

        await interaction.reply([random(images)].toString());
    },
};