import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import getCurrentMap from '../getCurrentMap';

const command = {
    data: new SlashCommandBuilder()
        .setName('ab-maps')
        .setDescription('Replies with the latest map rotations'),
    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();

        const map = await getCurrentMap();
        const { battle_royale, arenas, ranked, arenasRanked } = map;
        const embed = new MessageEmbed()
            .setColor('DARK_AQUA')
            .setTitle('Current Maps')
            .setThumbnail(
                'https://www.theloadout.com/wp-content/uploads/2021/10/apex-legends-new-map-season-11-storm-point-900x506.jpeg'
            )
            .setImage(battle_royale.current.asset)
            .addFields(
                {
                    name: 'Current Trios Map:',
                    value: battle_royale.current.map,
                },
                {
                    name: 'Time Left:',
                    value: battle_royale.current.remainingTimer || '',
                    inline: true,
                },
                {
                    name: 'Next Map:',
                    value: battle_royale.next.map,
                    inline: true,
                },
                {
                    name: '\u200B',
                    value: '\u2014\u2014\u2014\u2014',
                },
                {
                    name: 'Current Arenas Map:',
                    value: arenas.current.map,
                },
                {
                    name: 'Time Left:',
                    value: arenas.current.remainingTimer || '',
                    inline: true,
                },
                {
                    name: 'Next Map:',
                    value: arenas.next.map,
                    inline: true,
                },
                {
                    name: '\u200B',
                    value: '\u2014\u2014\u2014\u2014',
                },
                {
                    name: 'Current Ranked Arenas Map:',
                    value: arenasRanked.current.map,
                },
                {
                    name: 'Time Left:',
                    value: arenasRanked.current.remainingTimer || '',
                    inline: true,
                },
                {
                    name: 'Next Map:',
                    value: arenasRanked.next.map,
                    inline: true,
                }
            );

        interaction.editReply({ embeds: [embed] });
    },
};

export default command;
