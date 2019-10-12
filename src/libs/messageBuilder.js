const settings = require('../settings');
const Discord = require('discord.js');

function formatMatch(dataObj) {
    let message = '';

    Object.keys(dataObj).forEach((key) => {
        // Ignore SpreadsheetRow object method/meta data fields
        if(!settings.ignored_columns.includes(key)) {
            message += '\n' + key[0].toUpperCase() + key.substring(1) + ': ' + dataObj[key];
        }
    });

    console.log(message);
    return message;
}

function formatTeamsheet(dataArray, verbose) {

    dataArray = dataArray.map(p => p.trim().replace(/\n|\t/g, ''));

    if (!verbose) {
        const message =
        '1. ' + dataArray[0] + '\n' +
        '2. ' + dataArray[1] + '\n' +
        '3. ' + dataArray[2] + '\n' +
        '4. ' + dataArray[3] + '\n' +
        '5. ' + dataArray[4] + '\n' +
        '6. ' + dataArray[5] + '\n' +
        '7. ' + dataArray[6] + '\n' +
        '8. ' + dataArray[7] + '\n' +
        '9. ' + dataArray[8] + '\n' +
        '10. ' + dataArray[9] + '\n' +
        '11. ' + dataArray[10] + '\n' +
        '12. ' + dataArray[11] + '\n' +
        '13. ' + dataArray[12] + '\n' +
        '14. ' + dataArray[13] + '\n' +
        '15. ' + dataArray[14] + '\n\n' +
        '16. ' + dataArray[15] +
        '17. ' + dataArray[16] +
        '18. ' + dataArray[17] +
        '19. ' + dataArray[18] +
        '20. ' + dataArray[19] +
        '21. ' + dataArray[20] +
        '22. ' + dataArray[21] +
        '23. ' + dataArray[22];

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
        return embed;
    }
}

module.exports = {
    formatMatch,
    formatTeamsheet,
};