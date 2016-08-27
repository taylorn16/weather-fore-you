'use strict';

/**
 * @ngdoc function
 * @name weatherForeYouApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherForeYouApp
 */
angular.module('weatherForeYouApp')
  .controller('MainCtrl',
  ['forecastService', '$log', 'cityService',
  function (forecastService, $log, cityService) {

    forecastService.getForecast(39.64758, -75.68275, 'FORECAST_IO', 3).then(function(data) {
      // $log.info(data);
    });

    forecastService.getCurrentWeather(39.64758, -75.68275, 'FORECAST_IO').then(function(data) {
      // $log.info(data);
    });

    cityService.getSearchResultsFor('New York').then(function(data) {
      // $log.info(data);
    });

    cityService.getLatAndLongById('ChIJ0RhONcBEFkcRv4pHdrW2a7Q').then(function(data) {
      $log.info(data);
    });

  }]);
