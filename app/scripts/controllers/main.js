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
  ['forecastService', 'cityService', 'config', '$scope', '$rootScope',
  function (forecastService, cityService, config, $scope, $rootScope) {
    var vm = this;

    $rootScope.page = 'forecasts';

    // Update the search results each time the search input is changed
    vm.updateSearchResults = function() {
      if (vm.searchQuery) {                 // Only use an API call if we have a real query
        cityService.getSearchResultsFor(vm.searchQuery)
          .then(function(results) {
            vm.searchResults = results;
        });
      }
    };

    // Function happens when a user clears their query to start over
    vm.clearSearch = function() {
      vm.searchQuery = '';
      vm.searchResults = [];
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



    // Initialize search results and query
    vm.loadingState = true;
    vm.clearSearch();
    vm.searchQuery = 'New York, NY, United States';
    // Initially apply 'fake' defaults to the view to avoid blank spaces...
    vm.cityName = config.CITIES.DEFAULTS.name;
    vm.weather = {
      temperature: '-',
      apparentTemperature: '-',
      humidity: 0,
      date: new Date(),
      pressure: '-',
      cloudCover: 0
    };
    vm.forecastParams = config.FORECAST.DEFAULTS;
    vm.providers = config.FORECAST.PROVIDERS;
    // ... and load real weather values from default location (NY)
    forecastService.getCurrentWeather(vm.forecastParams)
      .then(function(weatherData) {
        vm.updateCurrentWeatherData(weatherData);
    });
    // Init the vm's days of forecasting
    vm.forecastDays = [];
    // Default to 3-day forecast
    forecastService.getForecast(vm.forecastParams, 3)
      .then(function(forecastDays) {
        vm.forecastDays = forecastDays;
    });

    // TODO: convert getIconCode and getCloudCode to filters

    // Update all appropriate model values with appropriate modifications
    // and parsings for units and for human-readable purposes
    vm.updateCurrentWeatherData = function(weatherData) {
      vm.weather = weatherData;
      vm.loadingState = false;
    };



    // Set up a $watch on the forecastParams and update current
    // weather block as necessary
    $scope.$watch(
      function watchForecastParams(scope) {
        return vm.forecastParams;
      },
      function handleParamsChange(newParams, oldParams) {
        // For a nice UI touch, bring up the loader overlay
        vm.loadingState = true;

        forecastService.getCurrentWeather(vm.forecastParams)
          .then(function(weatherData) {
            vm.updateCurrentWeatherData(weatherData);
        });
      },
      true                          // This third argument causes deep object equality to be performed
    );

  }]);
