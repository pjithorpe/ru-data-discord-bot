const config = require('../config');
const GoogleSpreadsheet = require('google-spreadsheet');

async function sheet() {
    const doc = new GoogleSpreadsheet(config.sheets.spreadsheet_id);

    return new Promise((resolve, reject) => {
        doc.useServiceAccountAuth(config.sheets.credentials, () => {
            doc.getRows(1, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
}

module.exports = sheet;