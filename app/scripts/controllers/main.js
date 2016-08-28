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
  ['forecastService', '$log', 'cityService', 'config', 'weatherCodeService', '$scope',
  function (forecastService, $log, cityService, config, weatherCodeService, $scope) {
    var vm = this;

    // Set up search models...
    vm.searchQuery = '';
    vm.searchResults = [];

    // ...and update the search results each time the search input is changed
    vm.updateSearchResults = function() {
      if (vm.searchQuery) {
        cityService.getSearchResultsFor(vm.searchQuery)
          .then(function(results) {
            vm.searchResults = results;
        });
      }
    };

    // Function happens when a user clicks a search result from the city search api
    vm.updateCurrentWeatherByResult = function(result) {
      // Update city name & clear search results
      vm.cityName = result.name;
      vm.searchResults = [];
      vm.searchQuery = result.name;

      // Update forecast location in the view model
      cityService.getLatAndLongById(result.id).then(function(location) {
        vm.forecastParams.latitude = location.latitude;
        vm.forecastParams.longitude = location.longitude;
      });
    }; // updateCurrentWeatherByResult()

    // Initially apply 'fake' defaults to the view to avoid blank spaces...
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

    // ... and load real weather values from default location (NY)
    forecastService.getCurrentWeather(vm.forecastParams)
      .then(function(weatherData) {
        vm.updateCurrentWeatherData(weatherData);
    });

    // Update all appropriate model values with appropriate modifications
    // and parsings for units and for human-readable purposes
    vm.updateCurrentWeatherData = function(weatherData) {
      vm.weather = {
        temperature: weatherData.temperature,
        iconCode: weatherCodeService.getIconCode(weatherData.cloudCover),
        apparentTemperature: weatherData.apparentTemperature,
        humidity: weatherData.humidity * 100,
        date: new Date(),
        cloudCode: weatherCodeService.getCloudCode(weatherData.cloudCover),
        pressure: weatherData.pressure
      };
    };

    // Set up a $watch on the forecastParams and update current
    // weather block as necessary
    $scope.$watch(
      function watchForecastParams(scope) {
        return vm.forecastParams;
      },
      function handleParamsChange(newParams, oldParams) {
        forecastService.getCurrentWeather(vm.forecastParams)
          .then(function(weatherData) {
            vm.updateCurrentWeatherData(weatherData);
        });
      },
      true
    );

  }]);
