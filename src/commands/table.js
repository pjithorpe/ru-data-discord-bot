const Discord = require('discord.js');
const settings = require('../settings');
const sheet = require('../libs/sheet');


module.exports = {
    name: 'table',
    aliases: ['league-table', 'tables'],
    description: 'Returns table for a given tournament.',
    args: true,
    usage: '<tournament> <?group|conference>',
    cooldown: 10,
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        let tableID;
        let groupIndex;
        // Get the inputted tournament
        let competition = args[0].toLowerCase();
        // Check if input is an alias
        if(competition in settings.competition_aliases) competition = settings.competition_aliases[competition];
        else return message.reply('No table found for competition \'' + competition + '\'.');

        // Get the worksheet indexes of the tables for groups in this competition
        const competitionTableIDs = settings.competition_table_mapping[competition];

        // Get the group number (if inputted), otherwise default to the first group
        if (args.length === 2 && args[1].length === 1) {
            const groupArg = args[1].toLowerCase();
            if (groupArg === '1' || groupArg === 'a') groupIndex = 0;
            else if (groupArg === '2' || groupArg === 'b') groupIndex = 1;
            else if (groupArg === '3' || groupArg === 'c') groupIndex = 2;
            else if (groupArg === '4' || groupArg === 'd') groupIndex = 3;
            else if (groupArg === '5' || groupArg === 'e') groupIndex = 4;
            else if (groupArg === '6' || groupArg === 'f') groupIndex = 5;
            else if (groupArg === '7' || groupArg === 'g') groupIndex = 6;
            else if (groupArg === '8' || groupArg === 'h') groupIndex = 7;
        }
        else {
            groupIndex = 0;
        }

        // Get the worksheet index for the specified group number
        if (groupIndex < competitionTableIDs.length) tableID = competitionTableIDs[groupIndex];
        else return message.reply('No table found for group \'' + groupIndex.toString() + '\'.');

        return sheet.getTable(tableID)
            .then(
                (result) => {
                    const rows = result;

                    const tableEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle(competition[0].toUpperCase() + competition.substring(1));

                    const fields = [
                        { name: 'Team', value: '' },
                        { name: 'Played', value: '' },
                        { name: 'W', value: '' },
                        { name: 'D', value: '' },
                        { name: 'L', value: '' },
                        { name: 'PD', value: '' },
                        { name: 'BP', value: '' },
                        { name: 'Points', value: '' },
                    ];

                    rows.forEach((row) => {
                        fields[0].value += row.team + '\n';
                        fields[1].value += row.played + '\n';
                        fields[2].value += row.w + '\n';
                        fields[3].value += row.d + '\n';
                        fields[4].value += row.l + '\n';
                        fields[5].value += row.pd + '\n';
                        fields[6].value += row.bp + '\n';
                        fields[7].value += row.points + '\n';
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