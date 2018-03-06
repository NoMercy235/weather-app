const request = require('request');

function onRequestFinished(err, response, body, resolve, reject) {
    if (err) {
        handleError(err, reject);
        reject(err);
        return;
    } else if (!body.results.length) {
        handleNoResults(reject);
        return;
    }
    resolve({
        formattedAddress: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng,
    });
}

function handleError(err, reject) {
    reject(err);
}

function handleNoResults(reject) {
    reject('No results found');
}

function geocodeAddress(address, googleApiKey) {
    const encodedAddress = encodeURIComponent(address);
    const reqOpts = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
        json: true,
    };
    return new Promise((resolve, reject) => {
        request(reqOpts, (err, response, body) => {
            onRequestFinished(err, response, body, resolve, reject);
        });
    });
}

module.exports = {
    geocodeAddress: geocodeAddress
};