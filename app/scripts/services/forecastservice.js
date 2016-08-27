'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.forecastService
 * @description
 * # forecastService
 * Service in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .service('forecastService', ['config', '$log', '$http',
  function (config, $log, $http) {

    // Gets back all the data from the API server
    function getForecastData(latitude, longitude, source) {
      var forecastParams = {
        latitude: latitude,
        longitude: longitude,
        source: source
      };

      return $http({
        method: 'GET',
        url: config.forecastAPI,
        params: forecastParams
      })
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          return error.message;
        });
    };

    // Parses API data for only today's weather
    this.getCurrentWeather = function(latitude, longitude, source) {

      return getForecastData(latitude, longitude, source)
        .then(function(data) {
          return data.currently;
        });
    }; // getCurrentWeather

    // Parses API data for a certain number of days
    this.getForecast = function(latitude, longitude, source, numDays) {
      // Some basic error-proofing in case users get creative
      if (numDays > 7) { numDays = 7;}
      if (numDays < 1) { numDays = 1;}

      return getForecastData(latitude, longitude, source)
        .then(function(data) {
          return _.slice(data.futureForecasts, 0, numDays);
        });
    }; // getForecast()

  }]);
