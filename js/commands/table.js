const Discord = require('discord.js');
const settings = require('../../settings');
const sportsDB = require('../libs/sportsDB');

module.exports = {
    name: 'table',
    aliases: ['league-table', 'tables'],
    description: 'Returns table for a given tournament.',
    args: true,
    usage: '<tournament>',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        let leagueID;
        // Get the inputted tournament
        const league = args[0].toLowerCase();
        // Check if input is an alias
        if(league in settings.league_aliases) {
            leagueID = settings.league_aliases[league];
        }
        else {
            return message.reply('No table found for league \'' + league + '\'.');
        }

        return sportsDB.getLeagueTable(leagueID)
            .then(
                (result) => {
                    console.log(result);

                    const tableEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle(league[0].toUpperCase() + league.substring(1));

                    const fields = [
                        { name: 'Team', value: '' },
                        { name: 'Points', value: '' },
                    ];

                    result.table.forEach((row) => {
                        // Team
                        fields[0].value += row.name + '\n';
                        // Points
                        fields[1].value += row.total + '\n';
                    });

                    fields.forEach((field) => {
                        tableEmbed.addField(field.name, field.value, true);
                    });

                    return message.channel.send({ embed: tableEmbed });
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};