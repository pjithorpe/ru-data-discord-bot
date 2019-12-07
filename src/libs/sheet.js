const config = require('../config');
const GoogleSpreadsheet = require('google-spreadsheet');

async function getSheetData(sheetID, worksheetIndex) {
    const doc = new GoogleSpreadsheet(sheetID);

    return new Promise((resolve, reject) => {
        doc.useServiceAccountAuth(config.sheets.credentials, () => {
            doc.getRows(worksheetIndex, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
}

async function getMatches() {
    return getSheetData(config.sheets.spreadsheet_id_matches, 1);
}

async function getTeamsheets() {
    return getSheetData(config.sheets.spreadsheet_id_teamsheets, 1);
}

async function getTable(worksheetID) {
    return getSheetData(config.sheets.spreadsheet_id_tables, worksheetID);
}

module.exports = {
    getMatches,
    getTeamsheets,
    getTable,
};