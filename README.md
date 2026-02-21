# Walnut Bot

Custom made bot for https://discord.gg/LycorisRecoil

## Project Status

This bot is in **maintenance mode**. It works as-is, but I'm not actively developing new features or providing regular updates.

## Setup app on Discord Developer Portal

1. Go to Discord Developer Portal and create a new application
2. Go to the "Bot" tab and click "Add Bot"
3. Copy the bot token and save it for later
4. In bot settings, enable "Server Members Intent" and "Message Content Intent"
5. Go to the "OAuth2" tab and click "URL Generator"
6. Select "bot" and "applications.commands" scopes
7. Under "Bot Permissions", select the permissions needed for the bot to function properly.
8. Copy the generated URL and use it to invite the bot to your server

## Setup MongoDB

1. Go to MongoDB website and create an account
2. Create a new cluster and database
3. Create a new user with database access and save the connection string

**Note:** Alternatively, you can self-host a local MongoDB instance and use its connection string instead.

## Setup Environment

1. Clone the repository
```sh
git clone https://github.com/MaxixSVK/walnut-bot.git
```
2. Install dependencies
```sh
cd walnut-bot
npm install
```
3. From .env.example create a .env file and fill in the required information

## Running the Bot

**Note:** When running the bot for the first time (or updating slash commands) you need to deploy slash commands to discord servers. You can do this by running the following command:
```sh
node src/deployCommands.js
```

You can start the bot with the following command:
```sh
npm start
```

## License
This project is licensed under the GNU General Public License Version 3. See the [LICENSE](LICENSE) file for details.