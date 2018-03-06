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

function handlerError(err) {
    if (runningAsScript) {
        console.error(err);
    } else {
        throw err;
    }
}

function getWeatherForAddress(address, keys) {
    return geocode.geocodeAddress(address, keys.googleApiKey)
        .then((geocodeData) => {
            if (runningAsScript) console.log(JSON.stringify(geocodeData, null, 4));
            return weather.weatherForCity(geocodeData, keys.forecastApiKey).then((data) => {
                if (runningAsScript) console.log(JSON.stringify(data, null, 4));
                const result = {
                    geocode: geocodeData,
                    weather: data,
                };
                process.send && process.send(result);
                return result;
            }).catch(handlerError);
        }).catch(handlerError);
}

if (runningAsScript) {
    keys = {
        googleApiKey: env.googleApiKey,
        forecastApiKey: env.forecastApiKey,
    };
    getWeatherForAddress(argv.address, keys);
}

module.exports = {
    geocode: geocode,
    weather: weather,
    getWeatherForAddress: getWeatherForAddress
};
