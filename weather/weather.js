const request = require('request');

function onRequestFinished(err, response, body, resolve, reject) {
    if (err) {
        handleError(err, reject);
        reject(err);
        return;
    }
    resolve(body);
}

function handleError(err, reject) {
    reject(err);
}

function weatherForCity(geocodeData, forecastApiKey) {
    const reqOpts = {
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${geocodeData.lat}&lon=${geocodeData.lng}&units=metric&APPID=${forecastApiKey}`,
        json: true,
    };
    return new Promise((resolve, reject) => {
        request(reqOpts, (err, response, body) => {
            onRequestFinished(err, response, body, resolve, reject);
        });
    });
}

module.exports = {
    weatherForCity: weatherForCity
};