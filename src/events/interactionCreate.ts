import fs from "fs";
import { CommandInteraction, Collection } from "discord.js";
import { Command } from "src/types";

module.exports = {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction) {
        const commands = new Collection();
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file: string) => /\.(ts|js)$/g.test(file));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.set(command.data.name, command);
        }

        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName) as Command;

        if (!command) return;

        console.log("interacted");

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    },
};
