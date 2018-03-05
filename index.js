const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
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

geocode.geocodeAddress(argv.address)
    .then((geocodeData) => {
        console.log(JSON.stringify(geocodeData, null, 4));
        weather.weatherForCity(geocodeData).then((data) => {
            console.log(JSON.stringify(data, null, 4));
            process.send({
                geocode: geocodeData,
                weather: data,
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });