const settings = require('../../settings');
const sheet = require('../libs/sheet');
const dates = require('../libs/dates');
const messageBuilder = require('../libs/messageBuilder');

module.exports = {
    name: 'match',
    aliases: ['game', 'partido'],
    description: 'Returns next match.',
    args: true,
    usage: '<team>',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return sheet()
            .then(
                (result) => {
                    // Get the inputted team
                    let team = args[0].toLowerCase();
                    // Check if input is an alias
                    if(team in settings.team_aliases) team = settings.team_aliases[team];
                    team = team.replace('_', ' ');

                    // Find team's next match
                    let teamRows = result.filter(r => r.home.toLowerCase() === team || r.away.toLowerCase() === team);
                    teamRows = dates.sortMatrixByDate(teamRows, settings.date_column_name, settings.time_column_name);

                    let resultRow = null;
                    // Get first date that is in the future
                    for(let i = 0; i < teamRows.length && resultRow == null; i++) {
                        if(dates.isFutureMoment(dates.parseDateAndTime(teamRows[i].date, teamRows[i].time))) {
                            resultRow = teamRows[i];
                        }
                    }

                    if(!resultRow) return message.reply('No match found for team \'' + team + '\'.');

                    return message.reply(messageBuilder(resultRow));
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};