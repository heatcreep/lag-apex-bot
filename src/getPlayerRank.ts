require('dotenv').config();
import fetch from 'node-fetch';

const API_URL = 'https://api.mozambiquehe.re/bridge?';
const { APEX_API_KEY = '' } = process.env;

export default async (username: string) => {
    const params = new URLSearchParams({
        version: '5',
        platform: 'PC',
        player: username,
        auth: APEX_API_KEY,
    });
    const response = await fetch(API_URL + params);
    const data = await response.json();

    if (data.global === undefined) {
        return '';
    } else {
        return data.global.rank;
    }
};
