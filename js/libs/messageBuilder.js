const settings = require('../../settings');

function messageBuilder(dataObj) {
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

module.exports = messageBuilder;