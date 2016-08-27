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
  ['forecastService', '$log',
  function (forecastService, $log) {
    
    forecastService.getForecast(39.64758, -75.68275, 'FORECAST_IO', 3).then(function(data) {
      $log.info(data);
    });

    forecastService.getCurrentWeather(39.64758, -75.68275, 'FORECAST_IO').then(function(data) {
      $log.info(data);
    });

  }]);
