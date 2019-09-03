const settings = require('../../settings');
const sheet = require('../libs/sheet');
const dates = require('../libs/dates');

module.exports = {
    name: 'next-match',
    aliases: ['next-game', 'match-next', 'game-next'],
    description: 'Return info for next match.',
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return sheet()
            .then(
                (result) => {
                    const rows = dates.sortMatrixByDate(result, settings.date_column_name, settings.time_column_name);

                    let resultRow = null;
                    // Get first date that is in the future
                    for(let i = 0; i < rows.length && resultRow == null; i++) {
                        if(dates.isFutureMoment(dates.parseDateAndTime(rows[i].date, rows[i].time))) {
                            resultRow = rows[i];
                        }
                    }

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
            )
    },
};