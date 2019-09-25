const settings = require('../../settings');
const sheet = require('../libs/sheet');
const dates = require('../libs/dates');
const messageBuilder = require('../libs/messageBuilder');

module.exports = {
    name: 'next-match',
    aliases: ['next-game', 'match-next', 'game-next'],
    description: 'Return info for next match.',
    args: true,
    cooldown: 60,
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

                    return message.reply(messageBuilder(resultRow));
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};