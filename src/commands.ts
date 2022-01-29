require("dotenv").config();
import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const {
    DISCORD_TOKEN = "",
    DISCORD_CLIENT_ID = "",
    DISCORD_GUILD_ID = "",
} = process.env;

const commands = [];
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file: string) => /\.(ts|js)$/g.test(file));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(
                DISCORD_CLIENT_ID,
                DISCORD_GUILD_ID
            ),
            {
                body: commands,
            }
        );

        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
    }
})();
