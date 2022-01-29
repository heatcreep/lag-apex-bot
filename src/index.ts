require('dotenv').config();
const fs = require('fs');
const { Client, Intents } = require('discord.js');

const { DISCORD_TOKEN } = process.env;

console.log('Bot is starting...');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const eventFiles = fs
    .readdirSync('./events')
    .filter((file: string) => /\.(ts|js)$/g.test(file));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args: any) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any) => event.execute(...args));
    }
}

client.login(DISCORD_TOKEN);
