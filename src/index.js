require('dotenv').config();
var fs = require('fs');
var _a = require('discord.js'),
    Client = _a.Client,
    Intents = _a.Intents;
var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
console.log('Bot is starting...');
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
var eventFiles = fs.readdirSync('./events').filter(function (file) {
    return /\.(ts|js)$/g.test(file);
});
var _loop_1 = function (file) {
    var event_1 = require('./events/'.concat(file));
    if (event_1.once) {
        client.once(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    } else {
        client.on(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    }
};
for (var _i = 0, eventFiles_1 = eventFiles; _i < eventFiles_1.length; _i++) {
    var file = eventFiles_1[_i];
    _loop_1(file);
}
client.login(DISCORD_TOKEN);
