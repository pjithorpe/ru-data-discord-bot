const settings = require('../settings');
const sheet = require('../libs/sheet');
const dates = require('../libs/dates');
const messageBuilder = require('../libs/messageBuilder');

module.exports = {
    name: 'match',
    aliases: ['game', 'partido', 'match-next', 'next-match'],
    description: 'Returns next match,  for a given team or competition.',
    args: false,
    usage: '<team|competition>',
    cooldown: 10,
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return sheet.getMatches()
            .then(
                (result) => {
                    let rows = result;

                    // If argument provided, filter on team/comp (otherwise, just get next match)
                    let arg;
                    if (args.length) {
                        // Get the inputted team/comp
                        arg = args[0].toLowerCase();
                        console.log(arg);

                        // We first check if the arg is a known competition
                        if (arg in settings.competition_aliases) {
                            arg = settings.competition_aliases[arg];
                            arg = arg.replace(/_/g, ' ');
                            rows = result.filter(r => r.competition.toLowerCase().trim() === arg);
                        }
                        // If not, assume it's a team
                        else {
                            // Check if input is a team alias
                            if(arg in settings.team_aliases) arg = settings.team_aliases[arg];
                            arg = arg.replace(/_/g, ' ');
                            rows = result.filter(r => r.home.toLowerCase().trim() === arg || r.away.toLowerCase().trim() === arg);
                        }
                    }

                    // Find team/comp's next match
                    rows = dates.sortMatrixByDate(rows, settings.date_column_name, settings.time_column_name);

                    let resultRow = null;
                    // Get first date that is in the future
                    for (let i = 0; i < rows.length && resultRow == null; i++) {
                        if (dates.isFutureMoment(dates.parseDateAndTime(rows[i].date, rows[i].time))) {
                            resultRow = rows[i];
                        }
                    }

                    if (!resultRow && args.length) return message.reply('No match found for team/competition \'' + arg + '\'.');

                    if (!resultRow) return message.reply('No matches found!');

                    return message.reply(messageBuilder.formatMatch(resultRow));
                },
                (err) => {
                    console.log(err);
                    return Promise.reject('Sheets API request failed.');
                },
            );
    },
};