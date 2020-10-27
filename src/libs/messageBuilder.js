const settings = require('../settings');
const Discord = require('discord.js');

function formatMatch(dataObj) {
    let titleHome, titleAway = '??';
    if (dataObj.home != null && dataObj.home.trim().length > 0) titleHome = dataObj.home;
    if (dataObj.away != null && dataObj.away.trim().length > 0) titleAway = dataObj.away;
    const embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(titleHome + ' vs ' + titleAway)
        .setThumbnail(settings.team_logos[dataObj['home'].replace(/ /g, '_').toLowerCase()])
        .setTimestamp();
    
    let fieldDate, fieldTime, fieldLoc, fieldComp = '??';
    if (dataObj.date != null && dataObj.date.trim().length > 0) fieldDate = dataObj.date;
    if (dataObj.time != null && dataObj.time.trim().length > 0) fieldTime = dataObj.time;
    if (dataObj.location != null && dataObj.location.trim().length > 0) fieldLoc = dataObj.location;
    if (dataObj.competition != null && dataObj.competition.trim().length > 0) fieldComp = dataObj.competition;
    embed.addField('Kickoff', fieldDate + ' ' + fieldTime);
    embed.addField('Location', fieldLoc);
    embed.addField('Competition', fieldComp);
    
    console.log(embed);
    return embed;
}

function formatPlayer(firstname, lastname, imageURL, dob, height, weight, teams, positions) {
    const embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(firstname + ' ' + lastname)
        .setThumbnail(imageURL)
        .setTimestamp();

    if (teams != null && teams.trim().length > 0) embed.addField('Teams', teams.slice(0, 2).reduce((output, team) => output += ', ' + team));
    if (positions != null && positions.trim().length > 0) embed.addField('Positions', positions.reduce((output, pos) => output += ', ' + pos));
    if (dob != null && dob.trim().length > 0) embed.addField('Born', dob);
    if (height != null && height.trim().length > 0) embed.addField('Height', height);
    if (weight != null && weight.trim().length > 0) embed.addField('Weight', weight);

    console.log(embed);
    return embed;
}

function formatTeamsheet(dataArray, verbose) {

    dataArray = dataArray.map(p => p.trim().replace(/\n|\t/g, ''));

    if (!verbose) {
        const message =
        '1. ' + dataArray[0] +
        '  2. ' + dataArray[1] +
        '  3. ' + dataArray[2] +
        '  4. ' + dataArray[3] +
        '  5. ' + dataArray[4] +
        '  6. ' + dataArray[5] +
        '  7. ' + dataArray[6] +
        '  8. ' + dataArray[7] +
        '  9. ' + dataArray[8] +
        '  10. ' + dataArray[9] +
        '  11. ' + dataArray[10] +
        '  12. ' + dataArray[11] +
        '  13. ' + dataArray[12] +
        '  14. ' + dataArray[13] +
        '  15. ' + dataArray[14] + '\n\n' +
        '16. ' + dataArray[15] +
        '  17. ' + dataArray[16] +
        '  18. ' + dataArray[17] +
        '  19. ' + dataArray[18] +
        '  20. ' + dataArray[19] +
        '  21. ' + dataArray[20] +
        '  22. ' + dataArray[21] +
        '  23. ' + dataArray[22];

        console.log(message);
        return message;
    }
    else {
        const embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Team')
            .addField('Front row', '1. ' + dataArray[0] + ' 2. ' + dataArray[1] + ' 3. ' + dataArray[2])
            .addField('Second row', '4. ' + dataArray[3] + ' 5. ' + dataArray[4])
            .addField('Back row', '6. ' + dataArray[5] + ' 8. ' + dataArray[7] + ' 7. ' + dataArray[6])
            .addField('Halfbacks', '9. ' + dataArray[8] + ' 10. ' + dataArray[9])
            .addField('Centres', '12. ' + dataArray[11] + ' 13. ' + dataArray[12])
            .addField('Outside backs', '11.' + dataArray[10] + ' 15. ' + dataArray[14] + ' 14. ' + dataArray[13])
            .addField('Replacements', '16. ' + dataArray[15] + ' 17. ' + dataArray[16] + ' 18. ' + dataArray[17] + ' 19. ' + dataArray[18] + ' 20. ' + dataArray[19] + ' 21. ' + dataArray[20] + ' 22. ' + dataArray[21] + ' 23. ' + dataArray[22])
            .setTimestamp();

        console.log(embed);
        return embed;
    }
}

module.exports = {
    formatMatch,
    formatPlayer,
    formatTeamsheet,
};