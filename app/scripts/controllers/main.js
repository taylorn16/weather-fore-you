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
  ['forecastService', 'cityService', 'config', '$scope', '$rootScope', 'photoService', 'chartService', 'locationService',
  function (forecastService, cityService, config, $scope, $rootScope, photoService, chartService, locationService) {
    var vm = this;                                       // Prefer use vm for readability and consistency
    var $ = window.jQuery;

    $rootScope.page = 'forecasts';                       // Primitive page-tabbing service implementation

    var _locationId = '';     // Privately keep track of the locationID from google

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
        var imageTarget = $('#weather-image');

        imageTarget.background('unload');
        imageTarget.background('load', url);
        imageTarget.background({ source: url });

      });
    } // updatePhoto()

    function updateForecastCards() {
      forecastService.getForecast(vm.forecastParams, vm.numForecastDays)
        .then(function(forecastDays) {
          vm.forecastDays = forecastDays;
          vm.chart = chartService.getChartOptionsFromForecast(forecastDays);
          vm.loadingState = false;
      });
    } // updateForecastCards()

    // Update all appropriate model values with appropriate modifications
    // and parsings for units and for human-readable purposes
    function updateCurrentWeatherData(weatherData) {
      vm.weather = weatherData;
      vm.loadingState = false;                        // The calls to the forecast card API and this API are the same,
    } // updateCurrentWeatherData()                  // so there will only be a minute difference between the load

    /*
    * This function handles all the initial setup work of the view-model.
    * In a perfect world, I would figure out a better way to persist more
    * data about the user's location so I didn't have to make two API calls
    * right off the bat.
    */
    function init() {
      // ---
      // Set up the view-model vars
      // ---
      vm.loadingState = true;
      vm.clearSearch();
      vm.providers = config.FORECAST.PROVIDERS;
      vm.forecastOptions = config.FORECAST.OPTIONS;
      vm.weather = config.WEATHER.DEFAULTS;
      vm.forecastDays = [];
      vm.numForecastDays = vm.forecastOptions[0].value;
      vm.chart = {};
      vm.forecastParams = config.FORECAST.DEFAULTS;
      _locationId = config.CITIES.DEFAULTS.locationId;
      vm.searchQuery = config.CITIES.DEFAULTS.name;
      vm.location = config.CITIES.DEFAULTS.name;
      vm.forecastParams = config.FORECAST.DEFAULTS;

      // ---
      // Make the first API calls with the defaults to get the ball rolling
      // ---
      forecastService.getCurrentWeather(vm.forecastParams)
        .then(function(weatherData) {
          updateCurrentWeatherData(weatherData);
      });
      forecastService.getForecast(vm.forecastParams, vm.numForecastDays)
        .then(function(forecastDays) {
          vm.forecastDays = forecastDays;
      });
      updatePhoto();

      // ---
      // Change up the view-model and make new API calls if the user stored a location
      // ---
      if (locationService.getLocation()) {                    // The user has stored a preffered location
        // Set private tracker to current location
        _locationId = locationService.getLocation();

        // Get address to put in search query bar and location name
        cityService.getAddressById(_locationId).then(function(address) {
          vm.searchQuery = address;
          vm.location = address;
        });
        // Get new forecast lat/lng params
        cityService.getLatAndLongById(_locationId).then(function(latlng) {
          vm.forecastParams.latitude = latlng.latitude;
          vm.forecastParams.longitude = latlng.longitude;
        });
        updatePhoto();
      }
    } // init()

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

        updateForecastCards();
      },
      true                          // This third argument causes deep object equality to be performed
    );

    // Set up a $watch on the number of days to forecast to update
    // the number of forecast cards shown without updating the
    // rest of the page.
    $scope.$watch('vm.numForecastDays', function handleChange(newNum, oldNum) {
      if(newNum === oldNum) {
        return null;
      } else {
        vm.loadingState = true;
        updateForecastCards();
        return;
      }
    });

    // Listen to the $rootScope event for setting location in order to set the location
    // with the private tracker var in this controller
    $rootScope.$on(config.EVENTS.SET_LOCATION, function setLocation() {
      locationService.setLocation(_locationId);
    });

    // ---
    // Init the view-model
    // ---
    init();

  }]);
