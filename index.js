const fs = require('fs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

// To be used if this is ran as a script;
let yargs;
let env;
let runningAsScript = !module.parent;

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
            },
            script: {
                alias: 'n',
                demand: false,
                describe: 'Overwrite the runningAsScript value.',
                default: true
            },
            type: {
                alais: 't',
                demand: true,
                describe: 'Choose from `weather` or `forecast`.',
                default: 'weather'
            }
        })
        .help()
        .alias('help', 'h')
        .boolean('script')
        .argv;
    runningAsScript = argv.script;
}

function handlerError(err) {
    if (runningAsScript) {
        console.error(err);
    } else {
        throw err;
    }
}

function getWeatherForAddress(address, keys, options = {}) {
    return geocode.geocodeAddress(address, keys.googleApiKey)
        .then((geocodeData) => {
            if (runningAsScript) console.log(JSON.stringify(geocodeData, null, 4));
            return weather.weatherForCity(geocodeData, keys.forecastApiKey, options).then((data) => {
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
    getWeatherForAddress(argv.address, keys, argv);
}

module.exports = {
    geocode: geocode,
    weather: weather,
    getWeatherForAddress: getWeatherForAddress
};
