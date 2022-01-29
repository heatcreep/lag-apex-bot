import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import getPlayerRank from '../getPlayerRank';

const handleRankedEmbedColor = (rank: string): number => {
    switch (rank) {
        case 'Bronze':
            return 0xb19282;
        case 'Silver':
            return 0xd3d3dd;
        case 'Gold':
            return 0xf4dba5;
        case 'Platinum':
            return 0x95f9fd;
        case 'Diamond':
            return 0x54a9f8;
        default:
            return 0x2a2d37;
    }
};

const command = {
    data: new SlashCommandBuilder()
        .setName('ab-rank')
        .setDescription('Replies with users rank!')
        .addStringOption((option) =>
            option.setName('player').setDescription('Enter your player name.')
        ),
    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const player = interaction.options.getString('player');

        if (player == null) {
            interaction.editReply('Please provide a username.');
            return;
        }

        try {
            const { rankName, rankDiv, rankImg, rankScore } =
                await getPlayerRank(player);

            console.log(interaction.user.avatarURL);

            const embed: any = {
                color: handleRankedEmbedColor(rankName),
                title: `${rankName} ${rankDiv}`,
                author: {
                    name: player,
                    icon_url: interaction.user.avatarURL(),
                },
                description: `You currently have ${rankScore} RP`,
                thumbnail: {
                    url: rankImg,
                },
            };

            if (!rankName.length) {
                interaction.editReply('No rank found for that name');
                return;
            }

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            interaction.editReply("Hmm couldn't find that user 🤔");
        }
    },
};

export default command;
