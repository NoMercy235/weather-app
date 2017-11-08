const request = require('request');
const cities = require('../cities/cities');
const env = require('../env');

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

function weatherForCity(geocodeData) {
    // const city = cities[geocodeData]
    // if ()
    // const encodedCity = encodeURIComponent(city);
    const reqOpts = {
        // url: `http://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&APPID=${env.forecastApiKey}`,
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${geocodeData.lat}&lon=${geocodeData.lng}&units=metric&APPID=${env.forecastApiKey}`,
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