const moment = require('moment');

function getDaysForecast (objects) {
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
    return options;
}

function checkOptions (options) {
    const allowed = ['weather', 'forecast'];
    if (!allowed.includes(options.type)) {
        throw Error(`Wrong 'type' option. Should be one of the following: ${allowed.join(', ')}.`);
    }
}

module.exports = {
    getDaysForecast: getDaysForecast,
    getDefaultOptions: getDefaultOptions,
    checkOptions: checkOptions,
};
