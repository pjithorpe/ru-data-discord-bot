const config = require('../config');
const GoogleSpreadsheet = require('google-spreadsheet');

async function getMatches() {
    const doc = new GoogleSpreadsheet(config.sheets.spreadsheet_id_matches);

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

async function getTeamsheets() {
    const doc = new GoogleSpreadsheet(config.sheets.spreadsheet_id_teamsheets);

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

module.exports = {
    getMatches,
    getTeamsheets
};