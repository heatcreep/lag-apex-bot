const { SlashCommandBuilder } = require('@discordjs/builders');

export interface Event {
    name: string;
    once?: boolean;
    execute: (...args: any) => void;
}

export interface Command {
    data: typeof SlashCommandBuilder;
    execute: (...args: any) => Promise<void>;
}
