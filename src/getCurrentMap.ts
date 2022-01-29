const API_URL = 'https://api.mozambiquehe.re';
import fetch from 'node-fetch';
const { APEX_API_KEY = '' } = process.env;

type CurrentMap = {
    map: string;
    asset: string;
    remainingTimer?: string;
};

export interface ApexMap {
    battle_royale: {
        current: CurrentMap;
        next: {
            map: string;
        };
    };
    ranked: {
        current: CurrentMap;
        next: {
            map: string;
        };
    };
    arenas: {
        current: CurrentMap;
        next: {
            map: string;
        };
    };
    arenasRanked: {
        current: CurrentMap;
        next: {
            map: string;
        };
    };
}

export default async (): Promise<ApexMap> => {
    const params = new URLSearchParams({
        version: '5',
        auth: APEX_API_KEY,
    });

    const response = await fetch(`${API_URL}/maprotation?${params}`);
    return await response.json();
};
