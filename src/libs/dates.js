const moment = require('moment');
const settings = require('../settings');

const dates = {
    parseDateAndTime(dateStr, timeStr) {
        const combinedStr = dateStr + ' ' + timeStr;
        const format = settings.date_format + ' ' + settings.time_format;

        const result = moment(combinedStr, format);
        if (!result.isValid()) throw Error('Invalid date.');

        return result;
    },

    isFutureMoment(_moment) {
        if (_moment.isAfter(moment())) return true;
        return false;
    },

    compareDates(moment1, moment2) {
        if (moment1.isBefore(moment2)) return -1;
        else if (moment1.isAfter(moment2)) return 1;
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