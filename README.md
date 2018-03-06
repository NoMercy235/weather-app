Weather App
=========

A simple weather app made in Node JS.

Uses the Google geocode and [Open Weather](http://openweathermap.org/) APIs to retrive the location of an address and get the current weather for it.

If you want to use this as a script, create a file called `env.js` in the root directory which has the same structure as the provided example.

The same format must be provided if you use this as a package.

## Usage

    const weatherApp = require('@nomercy235/weather-app');

    weatherApp.getWeatherForAddress(address, keys)

## Tests

  TBA
  
## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality (although there are none yet). Lint and test your code.