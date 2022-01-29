import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const command = {
    data: new SlashCommandBuilder()
        .setName("ab-help")
        .setDescription("Get a full list of apex bot commands"),
    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setTitle("Helpful Commands")
            .addFields(
                {
                    name: "/ab-rank <player-name>",
                    value: "Will display your current trios season rank",
                },
                {
                    name: "/ab-maps",
                    value: "Will display the current maps as well as what's coming up next!",
                }
            );

        interaction.editReply({ embeds: [embed] });
    },
};

export default command;
