import { Client, CommandInteraction, Interaction, Message, MessageEmbed } from "discord.js"
import getCurrentMap from "../getCurrentMap"
import getPlayerRank from "../getPlayerRank"

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isCommand()) return

        console.log('interacted')
        const { commandName } = interaction
        if (commandName === "ab-rank") {
            handleGetRank(interaction)
        }
        if (commandName === "ab-maps") {
            handleGetCurrentMaps(interaction)
        }
        if (commandName === "ab-help") {
            handleGetHelp(interaction)
        }
    })
}

const handleGetRank = async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply()
    const player = interaction.options.getString('player');
    if (player == null) {
        interaction.editReply("Please provide a username.")
    } else {
        try {
            const { rankName, rankDiv, rankImg, rankScore } = await getPlayerRank(player)
            console.log(interaction.user.avatarURL)
            const embed: any = {
                color: handleRankedEmbedColor(rankName),
                title: `${rankName} ${rankDiv}`,
                author: {
                    name: player,
                    icon_url: interaction.user.avatarURL()
                },
                description: `You currently have ${rankScore} RP`,
                thumbnail: {
                    url: rankImg
                }
            }
            if (!rankName.length) {
                interaction.editReply('No rank found for that name')
            } else {
                interaction.editReply({ embeds: [embed] })
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Hmm couldn\'t find that user 🤔')
        }
    }
}

const handleGetCurrentMaps = async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply()

    const map = await getCurrentMap()
    const { battle_royale, arenas, ranked, arenasRanked } = map
    const embed = new MessageEmbed()
        .setColor('DARK_AQUA')
        .setTitle('Current Maps')
        .setThumbnail("https://www.theloadout.com/wp-content/uploads/2021/10/apex-legends-new-map-season-11-storm-point-900x506.jpeg")
        .setImage(battle_royale.current.asset)
        .addFields(
            {
                name: "Current Trios Map:",
                value: battle_royale.current.map,
            },
            {
                name: "Time Left:",
                value: battle_royale.current.remainingTimer || '',
                inline: true
            },
            {
                name: "Next Map:",
                value: battle_royale.next.map,
                inline: true
            },
            {
                name: "\u200B",
                value: "\u2014\u2014\u2014\u2014",
            },
            {
                name: "Current Arenas Map:",
                value: arenas.current.map,
            },
            {
                name: "Time Left:",
                value: arenas.current.remainingTimer || '',
                inline: true
            },
            {
                name: "Next Map:",
                value: arenas.next.map,
                inline: true
            },
            {
                name: "\u200B",
                value: "\u2014\u2014\u2014\u2014",
            },
            {
                name: "Current Ranked Arenas Map:",
                value: arenasRanked.current.map,
            },
            {
                name: "Time Left:",
                value: arenasRanked.current.remainingTimer || '',
                inline: true
            },
            {
                name: "Next Map:",
                value: arenasRanked.next.map,
                inline: true
            },

        )
    interaction.editReply({ embeds: [embed] })
}

const handleGetHelp = async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply()
    const embed = new MessageEmbed()
        .setColor('#EFFF00')
        .setTitle("Helpful Commands")
        .addFields(
            { name: '/ab-rank <player-name>', value: "Will display your current trios season rank" },
            { name: '/ab-maps', value: "Will display the current maps as well as what's coming up next!" }
        )

    interaction.editReply({ embeds: [embed] })
}

const handleRankedEmbedColor = (rank: string): number => {
    switch (rank) {
        case 'Bronze':
            return 0xB19282
        case 'Silver':
            return 0xD3D3DD
        case 'Gold':
            return 0xF4DBA5
        case 'Platinum':
            return 0x95F9FD
        case 'Diamond':
            return 0x54A9F8
        default:
            return 0x2A2D37
    }
}