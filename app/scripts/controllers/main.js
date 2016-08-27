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

    // Set up search models
    vm.searchQuery = '';
    vm.searchResults = [];

    // Updating the search results happens each time the search input is changed
    vm.updateSearchResults = function() {
      cityService.getSearchResultsFor(vm.searchQuery)
        .then(function(results) {
          vm.searchResults = results;
      });
    };

    // Apply 'fake' defaults to the view
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
    vm.forecastParams = config.forecastParamDefaults;

    // Initialize real weather values with defaults
    forecastService.getCurrentWeather(vm.forecastParams)
      .then(function(weatherData) {
        vm.updateCurrentWeatherWithData(weatherData);
    });

    // Update all appropriate model values
    vm.updateCurrentWeatherWithData = function(weatherData) {
      vm.weather = {
        temperature: weatherData.temperature,
        iconCode: weatherCodeService.getIconCode(weatherData.cloudCover),
        apparentTemperature: weatherData.apparentTemperature,
        humidity: weatherData.humidity * 100,
        date: new Date(),
        cloudCode: weatherCodeService.getCloudCode(weatherData.cloudCover),
        pressure: weatherData.pressure
      };

      return;
    };

    vm.updateCurrentWeatherById = function(id) {
      $log.info(vm.forecastParams);
      cityService.getLatAndLongById(id).then(function(location) {
        vm.forecastParams.latitude = location.latitude;
        vm.forecastParams.longitude = location.longitude;
      });
      $log.info(vm.forecastParams);
      forecastService.getCurrentWeather(vm.forecastParams).then(function(weatherData) {
        vm.updateCurrentWeatherWithData(weatherData);
      });

      return;
    }; // updateCurrentWeatherById()



  }]);
