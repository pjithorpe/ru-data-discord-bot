const settings = require('../settings');
const sheet = require('../libs/sheet');
const messageBuilder = require('../libs/messageBuilder');

module.exports = {
    name: 'team',
    aliases: ['teamsheet', 'lineup'],
    description: 'Returns teams for given team.',
    args: true,
    usage: '<team> <?simple>',
    enabled: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return sheet.getTeamsheets()
            .then(
                (result) => {
                    const rows = result;

                    // If argument provided, filter on team (otherwise, just get next match)
                    let arg;
                    if (args.length) {
                        // Get the inputted team
                        arg = args[0].toLowerCase();
                        console.log(arg);

                        // Check if input is a team alias
                        if(arg in settings.team_aliases) arg = settings.team_aliases[arg];
                        arg = arg.replace(/_/g, ' ');
                    }

                    const matchIndex = rows.findIndex(r => r.home.toLowerCase().trim() === arg || r.away.toLowerCase().trim() === arg);

                    if (matchIndex === -1 && args.length) return message.reply('No teamsheet found for team \'' + arg + '\'.');

                    // Check if it's the home or away team
                    let homeOrAway;
                    if (rows[matchIndex].home.toLowerCase().trim() === arg) {
                        homeOrAway = 'home';
                    }
                    else {
                        homeOrAway = 'away';
                    }

                    // Now go through the next 23 rows to collect the teamsheet data
                    const team = [];
                    for (let i = 1; i < 24; i++) {
                        // Check there are no players listed or some are missing
                        if (rows[matchIndex + i].date.trim() !== '') return message.reply('Team not yet announced');

                        // Add player to team array
                        team.push(rows[matchIndex + i][homeOrAway]);
                    }

                    // Format teamsheet as a RichEmbed or just text
                    if (args.length === 2 && args[1] === 'simple') return message.reply(messageBuilder.formatTeamsheet(team, false));
                    else return message.channel.send(messageBuilder.formatTeamsheet(team, true));
                },
                (err) => {
                    console.log(err);
                    return Promise.reject('Sheets API request failed.');
                }
            );
    },
};