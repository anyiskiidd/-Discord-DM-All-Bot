# -Discord-DM-All-Bot

Welcome to the Discord DM Bot! This bot allows you to send a message to all members of a server using a bot account.

## Installation

1. Clone the repository or download the source code.
2. Install the dependencies by running `npm install` in the terminal.
3. Create a `.env` file in the root directory of the project.
4. In the `.env` file, add your bot token as `BOT_TOKEN=<your_bot_token>`.
5. Run the bot by running `node index.js` in the terminal.

## Usage

1. Once the bot is running, enter the server ID you want to DM all users on when prompted.
2. The bot will then send a message to all members of the server, one message per second to avoid getting rate-limited by Discord.

## Error handling

- If the server ID is invalid or the bot is not in the server, the bot will output an error message and exit.
- If the bot is missing permissions to send messages to a member, the bot will output an error message and continue sending messages to the other members.
- If a member has disabled direct messages from server members or has blocked the bot, the bot will output an error message and continue sending messages to the other members.
- If there is an unknown error, the bot will output an error message and exit.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
