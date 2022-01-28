require('dotenv').config()
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const {
    DISCORD_TOKEN = "",
    DISCORD_CLIENT_ID = "",
    DISCORD_GUILD_ID = "" } = process.env;


const commands = [
    // ---- /ab-rank
    new SlashCommandBuilder()
        .setName('ab-rank')
        .setDescription('Replies with users rank!')
        .addStringOption(option => option.setName('player').setDescription('Enter your player name.')),
    // ---- /ab-maps
    new SlashCommandBuilder()
        .setName('ab-maps')
        .setDescription('Replies with the latest map rotations'),
    // ---- /ab-help
    new SlashCommandBuilder()
        .setName('ab-help')
        .setDescription('Get a full list of apex bot commands')
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);