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
        vm.updateCurrentWeatherData(weatherData);
    });

    // Update all appropriate model values with appropriate modifications
    vm.updateCurrentWeatherData = function(weatherData) {
      $log.info('update weather data called');
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

    // Function happens when a user clicks a search result from the city search api
    vm.updateCurrentWeatherByResult = function(result) {
      // Update city name
      vm.cityName = result.name;

      // Update forecast location in the view model
      cityService.getLatAndLongById(result.id).then(function(location) {
        vm.forecastParams.latitude = location.latitude;
        vm.forecastParams.longitude = location.longitude;
      });
    }; // updateCurrentWeatherByResult()

    // Set up a watch on the forecastParams and update current
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
