'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.config
 * @description
 * # config
 * Constant in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .constant('config', {
    FORECAST: {
      API_URL: 'http://chathamweatherapi.azurewebsites.net/api/forecast',
      DEFAULTS: {
        latitude: 40.7127837,         // Defaults to NY City, NY
        longitude: -74.0059413,
        source: 'FORECAST_IO'
      },
      PROVIDERS: [
        {
          name: 'Forecast.io',
          code: 'FORECAST_IO'
        },
        {
          name: 'World Weather',
          code: 'WORLD_WEATHER'
        }
      ],
      OPTIONS: [
        {
          value: 2,
          name: '2 Days'
        },
        {
          value: 4,
          name: '4 Days'
        },
        {
          value: 6,
          name: '6 Days'
        }
      ]
    },

    CITIES: {
      SEARCH_API_URL: 'http://chathamweatherapi.azurewebsites.net/api/cities/search',
      ID_API_URL: 'http://chathamweatherapi.azurewebsites.net/api/cities/',
      PHOTOS: {
        API_KEY: 'AIzaSyD077HUyCNAttrxo-QxGVlKXhG7G05QgGg'
      },
      DEFAULTS: {
        name: "New York, NY, United States"
      }
    },

    // Increasing cloud code values denote increasing cloudiness
    HUMAN_CODES: {
      CLOUDS: {
          '10': 'Clear Skies',
          '20': 'Partly Cloudy',
          '30': 'Cloud Cover',
          '40': 'Dense Clouds'
      },
      ICONS: {            // Corresponding icon from the meteocons free set
        NIGHT: {
          '10': 'C',
          '20': 'I',
          '30': '5',
          '40': '%'
        },
        DAY: {
          '10': 'B',
          '20': 'H',
          '30': 'N',
          '40': 'Y'
        }
      }
    },

    WEATHER: {
      DEFAULTS: {
        temperature: 0,
        apparentTemperature: 0,
        humidity: 0,
        date: new Date(),
        pressure: 0,
        cloudCover: 0
      }
    }

  });
