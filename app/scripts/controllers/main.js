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
  ['forecastService', 'cityService', 'config', '$scope', '$rootScope', 'photoService', 'chartService',
  function (forecastService, cityService, config, $scope, $rootScope, photoService, chartService) {
    var vm = this;

    $rootScope.page = 'forecasts';

    var _locationId = 'ChIJOwg_06VPwokRYv534QaPC8g';     // Privately keep track of the locationID from google

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
    }; // clearSearch()

    // Function happens when a user clicks a search result from the city search api
    vm.updateCurrentWeatherByResult = function(result) {
      // Update city name & clear search results
      vm.location = result.name;
      vm.searchResults = [];
      vm.searchQuery = result.name;
      _locationId = result.id;
      // Update forecast location in the view model
      cityService.getLatAndLongById(result.id).then(function(location) {
        vm.forecastParams.latitude = location.latitude;
        vm.forecastParams.longitude = location.longitude;
      });
      updatePhoto();
    }; // updateCurrentWeatherByResult()

    function updatePhoto() {
      photoService.getPhotoUrlById(_locationId).then(function(url) {
        console.log(url);
        var imageTarget = $('#weather-image');

        imageTarget.background('unload');
        imageTarget.background('load', url)
        imageTarget.background({ source: url });

      });
    };

    // Update all appropriate model values with appropriate modifications
    // and parsings for units and for human-readable purposes
    function updateCurrentWeatherData(weatherData) {
      vm.weather = weatherData;
      vm.loadingState = false;
    }; // updateCurrentWeatherData()

    // Init photo url
    updatePhoto();

    // Initialize search results and query
    vm.loadingState = true;
    vm.clearSearch();
    vm.searchQuery = 'New York, NY, United States';

    // Initially apply 'fake' defaults to the view to avoid blank spaces...
    vm.location = config.CITIES.DEFAULTS.name;
    vm.weather = config.WEATHER.DEFAULTS;
    vm.forecastParams = config.FORECAST.DEFAULTS;
    vm.providers = config.FORECAST.PROVIDERS;

    // ... and then load up real weather values from default location
    forecastService.getCurrentWeather(vm.forecastParams)
      .then(function(weatherData) {
        updateCurrentWeatherData(weatherData);
    });

    // Init the vm's days of forecasting
    // Default to 3-day forecast
    vm.forecastDays = [];
    vm.numDaysToForecast = 2;
    vm.chart = {};
    forecastService.getForecast(vm.forecastParams, vm.numDaysToForecast)
      .then(function(forecastDays) {
        vm.forecastDays = forecastDays;
    });


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
            updateCurrentWeatherData(weatherData);
        });
      },
      true                          // This third argument causes deep object equality to be performed
    );

    $scope.$watch('vm.numDaysToForecast', function handleChange(newNum, oldNum) {
      // TODO: create loading state/animations to handle this change

      forecastService.getForecast(vm.forecastParams, vm.numDaysToForecast)
        .then(function(forecastDays) {
          vm.forecastDays = forecastDays;
          vm.chart = chartService.getChartOptionsFromForecast(forecastDays);
        });
    });

    // TODO: make this chart's data interact with the forecast data for real-time updating

  }]);
