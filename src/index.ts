require('dotenv').config()
import ready from "./listeners/ready"
import { Client, Intents, MessageEmbed } from "discord.js"
import interactionCreate from "./listeners/interactionCreate"

const { DISCORD_TOKEN } = process.env

console.log("Bot is starting...");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

ready(client)
interactionCreate(client)

client.login(DISCORD_TOKEN)