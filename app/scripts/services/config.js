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

    
  });
