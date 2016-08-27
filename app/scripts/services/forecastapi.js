'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.forecastAPI
 * @description
 * # forecastAPI
 * Constant in the weatherForeYouApp for referencing the API url across the data services.
 */
angular.module('weatherForeYouApp')
  .constant('forecastAPI', 'http://chathamweatherapi.azurewebsites.net/api/forecast');
