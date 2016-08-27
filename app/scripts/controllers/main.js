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
  ['forecastService', '$log', 'cityService', 'config', 'weatherCodeService',
  function (forecastService, $log, cityService, config, weatherCodeService) {
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
        vm.weather.cloudCode = weatherCodeService.getCloudCode(weatherData.cloudCover);
        vm.weather.iconCode = weatherCodeService.getIconCode(weatherData.cloudCover);
      });

  }]);
