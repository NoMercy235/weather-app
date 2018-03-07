const request = require('request');
const Utils = require('./utils');

function onRequestFinished(err, response, body, resolve, reject, options) {
    if (err) {
        handleError(err, reject);
        reject(err);
    } else {
        const result = options.type === 'forecast' ? Utils.getDaysForecast(body.list) : body;
        resolve(result);
    }
}

function handleError(err, reject) {
    reject(err);
}

function weatherForCity(geocodeData, forecastApiKey, options) {
    options = Utils.getDefaultOptions(options);
    Utils.checkOptions(options);
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