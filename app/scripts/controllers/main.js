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
  ['forecastService', '$log', 'cityService', 'config',
  function (forecastService, $log, cityService, config) {
    var vm = this;

    vm.cityName = config.cityDefaults.name;
    vm.weather = {
      temperature: '-',
      iconCode: '-',
      apparentTemperature: '-',
      humidity: '-',
      date: new Date(),
      cloudCode: '-',
      pressure: '-'
    };

    forecastService.getCurrentWeather(config.forecastParamDefaults)
      .then(function(weatherData) {
        vm.weather.temperature = weatherData.temperature;
        vm.weather.apparentTemperature = weatherData.apparentTemperature;
        vm.weather.humidity = weatherData.humidity * 100;
        vm.weather.pressure = weatherData.pressure;
      });

  }]);
