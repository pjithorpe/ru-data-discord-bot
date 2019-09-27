const request = require('request');

const sportsDB = {
    async getLeagueTable(leagueID, season = 0) {
        let requestStr = 'https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=' + leagueID;

        // If season is specified then add to query
        if (season !== 0) {
            requestStr += '&s=' + season;
        }
        console.log(requestStr);

        return new Promise((resolve, reject) => {
            request(requestStr, { json: true }, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                resolve(body);
            });
        });
    },
};

module.exports = sportsDB;