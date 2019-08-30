const sheet = require('./../sheet');

module.exports = {
    name: 'match',
    aliases: ['game', 'partido'],
    description: 'Returns next match.',
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        sheet()
            .then(
                result => {
                    message.reply(
                        '\n' +
                        'Teams: ' + result[0].home + ' vs ' + result[0].away + '\n' +
                        'Time: ' + result[0].date + ' ' + result[0].time + '\n' +
                        'Competition: ' + result[0].competition + '\n' +
                        'Channel: ' + result[0].channel
                    );
                },
                err => {
                    console.log(err);
                }
            );
    },
};