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
    forecastDefaults: {
      latitude: 40.71278,
      longitude: -74.00594,
      source: 'FORECAST_IO'
    },

    citySearchAPI: 'http://chathamweatherapi.azurewebsites.net/api/cities/search',
    cityIdAPI: 'http://chathamweatherapi.azurewebsites.net/api/cities/'
  });
