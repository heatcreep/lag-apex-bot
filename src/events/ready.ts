import { Client } from 'discord.js';
import { Event } from 'src/types';

const event: Event = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        if (!client.user || !client.application) {
            return;
        }

        console.log(`${client.user.username} is online`);
    },
};

export default event;
