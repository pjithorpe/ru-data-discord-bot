const config = require('./config');
const sheet = require('./sheet');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if(message.content.startsWith('!match')) {
        sheet()
            .then(
                result => {
                    message.reply(
                        '\n' +
                        'Teams: ' + result[1].teams + '\n' +
                        'Time: ' + result[1].date + ' ' + result[1].time + '\n' +
                        'Competition: ' + result[1].competition + '\n' +
                        'Channel: ' + result[1].channel
                    );
                },
                err => {
                    console.log(err);
                }
            );
    }
});

client.login(config.discord.bot_token);