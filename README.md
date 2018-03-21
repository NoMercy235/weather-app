Weather App
=========

A simple weather app made in Node JS.

Uses the [Google geocode](https://developers.google.com/maps/documentation/geocoding/get-api-key) and [Open Weather](http://openweathermap.org/) APIs to retrive the location of an address and get the current weather for it. You will need to the keys from both of these APIs if you want to use this package.

If you want to use this as a script, create a file called `env.js` in the root directory which has the same structure as the provided example.

The same format must be provided if you use this as a package.

## Usage

    const weatherApp = require('@nomercy235/weather-app');

    // address: string
    // keys: { googleApiKey: string, forecastApiKey: string }
    // options: { type: 'weather' | 'forecast', limit: number }  
    weatherApp.getWeatherForAddress(address, keys, options)

## Tests

  TBA
  
## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality (although there are none yet). Lint and test your code.

## LICENSE
MIT
