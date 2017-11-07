const cities = require('./city-list.json');

let newCities = {};

cities.forEach((city) => {
    if (!newCities[city.country]) newCities[city.country] = [];
    newCities[city.country].push(city);
});

module.exports = newCities;