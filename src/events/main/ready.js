const { Events, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const config = require("../../config.json");
const path = require("path");
const fs = require("fs");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        if (config.CommandsListOnStartup) {
            console.log("[INFO] Loaded commands:")
            console.log("----------------------------------")
            const folders = fs.readdirSync(path.join(__dirname, "../../commands"));

            for (const folderjs of folders) {
                const filesjslog = fs.readdirSync(path.join(__dirname, "../../commands/") + folderjs).filter(file => file.endsWith(".js"));
                console.log(folderjs.toUpperCase())
                console.log(filesjslog.toString().replaceAll(".js", " ").replaceAll(",", ""))
            }
            console.log("----------------------------------")
        }

        try {
            mongoose.connect(process.env.MongoDB).then(() => console.log("[INFO] Connected to MongoDB"));
        } catch (error) {
            console.log("[INFO] Couldn't connect to MongoDB")
            return
        }

        console.log(`[INFO] Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{
                name: config.CustomStatus,
                type: ActivityType.Custom
            }],
            status: "online"
        });
    }
};