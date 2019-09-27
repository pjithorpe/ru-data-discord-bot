const settings = require('../settings');
const sheet = require('../libs/sheet');
const dates = require('../libs/dates');
const messageBuilder = require('../libs/messageBuilder');

module.exports = {
    name: 'match',
    aliases: ['game', 'partido'],
    description: 'Returns next match for a given team or competition.',
    args: true,
    usage: '<team|competition>',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return sheet()
            .then(
                (result) => {
                    // Get the inputted team/comp
                    let arg = args[0].toLowerCase();
                    console.log(arg);

                    let rows;
                    // We first check if the arg is a known competition
                    if(arg in settings.competition_aliases) {
                        arg = settings.competition_aliases[arg];
                        arg = arg.replace(/_/g, ' ');
                        rows = result.filter(r => r.competition.toLowerCase() === arg);
                    }
                    // If not, assume it's a team
                    else {
                        // Check if input is a team alias
                        if(arg in settings.team_aliases) arg = settings.team_aliases[arg];
                        arg = arg.replace(/_/g, ' ');
                        rows = result.filter(r => r.home.toLowerCase() === arg || r.away.toLowerCase() === arg);
                    }

                    // Find team/comp's next match
                    rows = dates.sortMatrixByDate(rows, settings.date_column_name, settings.time_column_name);

                    let resultRow = null;
                    // Get first date that is in the future
                    for(let i = 0; i < rows.length && resultRow == null; i++) {
                        if(dates.isFutureMoment(dates.parseDateAndTime(rows[i].date, rows[i].time))) {
                            resultRow = rows[i];
                        }
                    }

                    if(!resultRow) return message.reply('No match found for team/competition \'' + arg + '\'.');

                    return message.reply(messageBuilder(resultRow));
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};