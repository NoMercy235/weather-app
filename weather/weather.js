const request = require('request');
const Utils = require('./utils');

function onRequestFinished(err, response, body, resolve, reject, options) {
    if (err) {
        reject(`Error on weatherForCity request: ${err}`);
    } else {
        const result = options.type === 'forecast' ? Utils.getDaysForecast(body.list, options.limit) : body;
        resolve(result);
    }
}

function weatherForCity(geocodeData, forecastApiKey, options) {
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