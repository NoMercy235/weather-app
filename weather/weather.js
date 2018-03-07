const request = require('request');
const moment = require('moment');

function getDaysForecast(objects) {
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
            results.push({date: date, values: [obj]});
        } else {
            results[dateIndex].values.push(obj);
        }
    });

    return results;
}

function onRequestFinished(err, response, body, resolve, reject, options) {
    if (err) {
        handleError(err, reject);
        reject(err);
    } else {
        const result = options.type === 'forecast' ? getDaysForecast(body.list) : body;
        resolve(result);
    }
}

function handleError(err, reject) {
    reject(err);
}

function weatherForCity(geocodeData, forecastApiKey, options = {}) {
    options.type = options.type || 'forecast';
    const reqOpts = {
        url: `http://api.openweathermap.org/data/2.5/${options.type}?lat=${geocodeData.lat}&lon=${geocodeData.lng}&units=metric&APPID=${forecastApiKey}`,
        json: true,
    };
    return new Promise((resolve, reject) => {
        request(reqOpts, (err, response, body) => {
            onRequestFinished(err, response, body, resolve, reject, options);
        });
    });
}

module.exports = {
    weatherForCity: weatherForCity
};