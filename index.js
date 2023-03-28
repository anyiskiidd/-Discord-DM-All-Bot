const Discord = require('discord.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

console.log('\x1b[36m%s\x1b[0m', 'Welcome to the Discord DM Bot!');
console.log('Created by Tech Guru#1101');

rl.question('\nEnter your bot token: ', (token) => {
  client.login(token)
    .then(() => {
      console.log('\x1b[32m%s\x1b[0m', `Logged in as ${client.user.tag}`);

      rl.question('\nEnter the server ID you want to DM all users on: ', async (serverId) => {
        const server = client.guilds.cache.get(serverId);

        if (!server) {
          console.error('\x1b[31m%s\x1b[0m', `Server with ID ${serverId} not found.`);
          rl.close();
          return;
        }

        try {
          const members = await server.members.fetch();
          let count = 0;

          for (const [id, member] of members) {
            if (member.user.bot) continue;

            try {
              await member.send('Hello from the bot!');
              console.log(`Sent message to ${member.user.tag}`);
              count++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              console.error(`Error sending message to ${member.user.tag}: ${error}`);
              if (error.code === 50007) {
                console.error(`The user ${member.user.tag} has disabled direct messages from server members.`);
              } else if (error.code === 50013) {
                console.error(`The bot is missing permissions to send messages to ${member.user.tag}.`);
              } else if (error.code === 50001) {
                console.error(`The bot is not in the same server as ${member.user.tag}.`);
              } else if (error.code === 50003) {
                console.error(`The user ${member.user.tag} has blocked the bot.`);
              } else {
                console.error(`Unknown error: ${error}`);
              }
            }
          }

          console.log(`Sent message to ${count} members of server ${server.name}`);
        } catch (error) {
          console.error(`Error fetching server members: ${error}`);
        } finally {
          rl.close();
        }
      });
    })
    .catch((error) => {
      console.error('\x1b[31m%s\x1b[0m', `Error logging in: ${error}`);
      rl.close();
    });
});
