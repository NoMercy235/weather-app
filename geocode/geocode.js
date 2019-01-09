const request = require('request');

function onRequestFinished(err, response, body, address, resolve, reject) {
    if (err) {
        handleError(err, reject);
        return;
    } else if (!body.results.length) {
        handleNoResults(address, reject);
        return;
    }
    resolve({
        formattedAddress: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng,
    });
}

function handleError(err, reject) {
    reject(`Error on geocode request: ${err}`);
}

function handleNoResults(address, reject) {
    reject(`No results found for address "${address}"`);
}

function geocodeAddress(address, googleApiKey) {
    const encodedAddress = encodeURIComponent(address);
    const reqOpts = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
        json: true,
    };
    return new Promise((resolve, reject) => {
        request(reqOpts, (err, response, body) => {
            onRequestFinished(err, response, body, address, resolve, reject);
        });
    });
}

module.exports = {
    geocodeAddress: geocodeAddress
};