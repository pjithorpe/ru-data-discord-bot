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
                    // Get the first row
                    let team = args[0].toLowerCase();
                    // Check if input is an alias
                    if(team in settings.team_aliases) team = settings.team_aliases[team];
                    team = team.replace('_', ' ');

                    // Find team's next match
                    const resultRow = result.find(r => r.home.toLowerCase() === team || r.away.toLowerCase() === team);
                    
                    if(!resultRow) return message.reply('No match found for team \'' + team + '\'.');

                    return message.reply(
                        '\n' +
                        'Teams: ' + resultRow.home + ' vs ' + resultRow.away + '\n' +
                        'Time: ' + resultRow.date + ' ' + resultRow.time + '\n' +
                        'Competition: ' + resultRow.competition + '\n' +
                        'Channel: ' + resultRow.channel
                    );
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};