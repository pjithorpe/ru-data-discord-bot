const sheet = require('./../sheet');
const settings = require('./../settings');

module.exports = {
    name: 'match',
    aliases: ['game', 'partido'],
    description: 'Returns next match.',
    args: true,
    usage: '<team>',
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return sheet()
            .then(
                (result) => {
                    const resultRow;
                    if (args) {
                        let team = args[0].toLowerCase();
                        // Check if input is an alias
                        if(team in settings.team_aliases) team = settings.team_aliases[team];
                        team = team.replace('_', ' ');
                    }
                    else {
                        resultRow = result[0];
                    }
                    message.reply(
                        '\n' +
                        'Teams: ' + result[0].home + ' vs ' + result[0].away + '\n' +
                        'Time: ' + result[0].date + ' ' + result[0].time + '\n' +
                        'Competition: ' + result[0].competition + '\n' +
                        'Channel: ' + result[0].channel
                    );
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};