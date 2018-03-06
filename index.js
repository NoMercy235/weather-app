const fs = require('fs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const runningAsScript = !module.parent;

// To be used if this is ran as a script;
let yargs;
let env;

if (runningAsScript) {
    if (!fs.existsSync('env.js')) {
        console.error('Environment file not detected. Please create "./env.js".');
        process.exit(1);
    } else {
        env = require('./env.js');
    }
    yargs = require('yargs');
}

let argv;

if (runningAsScript) {
    argv = yargs
        .options({
            address: {
                alias: 'a',
                demand: true,
                describe: 'Address for which you request the weather.',
                string: true,
            }
        })
        .help()
        .alias('help', 'h')
        .argv;
}

function getWeatherForCity(keys) {
    geocode.geocodeAddress(argv.address, keys.googleApiKey)
        .then((geocodeData) => {
            console.log(JSON.stringify(geocodeData, null, 4));
            weather.weatherForCity(geocodeData, keys.forecastApiKey).then((data) => {
                console.log(JSON.stringify(data, null, 4));
                process.send && process.send({
                    geocode: geocodeData,
                    weather: data,
                });
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
        console.error(err);
    });
}

if (runningAsScript) {
    getWeatherForCity({
        googleApiKey: env.googleApiKey,
        forecastApiKey: env.forecastApiKey,
    });
}

module.exports = {
    geocode: geocode,
    weather: weather,
    getWeatherForCity: getWeatherForCity
};
