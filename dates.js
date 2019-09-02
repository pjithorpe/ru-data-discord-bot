const moment = require('moment');
const settings = require('./settings');

const dates = {
    parseDateAndTime(dateStr, timeStr) {
        const combinedStr = dateStr + ' ' + timeStr;
        const format = settings.date_format + ' ' + settings.time_format;

        const result = moment(combinedStr, format);
        if (!result.isValid()) throw Error('Invalid date.');

        return result;
    },

    compareDates(date1, date2) {
        if (date1.isBefore(date2)) return -1;
        else if (date1.isAfter(date2)) return 1;
        return 0;
    },

    sortMatrixByDate(data, dateColName, timeColName, ascending = true) {
        // Sort using custom date compare function
        const result = data.sort((row1, row2) => {
            const date1 = this.parseDateAndTime(row1[dateColName], row1[timeColName]);
            const date2 = this.parseDateAndTime(row2[dateColName], row2[timeColName]);

            return this.compareDates(date1, date2);
        });

        if (!ascending) return result.reverse();
        return result;
    },
};

module.exports = dates;