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
    forecastAPI: 'http://chathamweatherapi.azurewebsites.net/api/forecast',
    forecastParamDefaults: {
      latitude: 40.7127837,         // Defaults to NY City, NY
      longitude: -74.0059413,
      source: 'FORECAST_IO'
    },

    cityDefaults: {
      name: "New York, NY, United States"
    },
    citySearchAPI: 'http://chathamweatherapi.azurewebsites.net/api/cities/search',
    cityIdAPI: 'http://chathamweatherapi.azurewebsites.net/api/cities/',

    // Increasing cloud code values denote increasing cloudiness
    CLOUD_CODES: {
        '10': 'clear skies',
        '20': 'partly cloudy',
        '30': 'cloud cover',
        '40': 'dense clouds'
    },
    ICON_CODES: {
      night: {
        '10': 'C',
        '20': 'I',
        '30': '5',
        '40': '%'
      },
      day: {
        '10': 'B',
        '20': 'H',
        '30': 'N',
        '40': 'Y'
      }
    }
  });
