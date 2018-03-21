const moment = require('moment');

function getDaysForecast (objects, limit = 0) {
    let results = [];
    const dateExists = (date) => {
        return results.findIndex((res) => {
            return res.date.startOf('day').isSame(date.startOf('day'));
        });
    };

    objects.forEach((obj) => {
        let date = moment.unix(obj.dt);
        const dateIndex = dateExists(date);
        if (dateIndex === -1) {
            if (limit > 0 && results.length >= limit) return;
            results.push({ date: date, values: [ obj ] });
        } else {
            results[ dateIndex ].values.push(obj);
        }
    });

    return results;
}

function getDefaultOptions (options) {
    options = options || {};
    options.type = options.type || 'forecast';
    options.limit = options.limit || 0;
    return options;
}

function checkOptions (options) {
    const allowed = ['weather', 'forecast'];
    if (!allowed.includes(options.type)) {
        throw Error(`Wrong 'type' option. Should be one of the following: ${allowed.join(', ')}.`);
    }
    if (options.limit && (!Number.isInteger(options.limit) || +options.limit <= 0)) {
        throw Error(`Wrong 'limit' option. Should be a positive integer.`);
    }
}

module.exports = {
    getDaysForecast: getDaysForecast,
    getDefaultOptions: getDefaultOptions,
    checkOptions: checkOptions,
};
