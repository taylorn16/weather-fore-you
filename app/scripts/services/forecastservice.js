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
    function getForecastData(forecastParams) {
      // see  services/config.js for forecastParams properties

      return $http({
        method: 'GET',
        url: config.FORECAST.API_URL,
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
    this.getCurrentWeather = function(forecastParams) {
      return getForecastData(forecastParams)
        .then(function(data) {
          return data.currently;
        });
    }; // getCurrentWeather

    // Parses API data for a certain number of days
    this.getForecast = function(forecastParams, numDays) {
      // Some basic error-proofing in case users get creative
      if (numDays > 7) { numDays = 7;}
      if (numDays < 1) { numDays = 1;}

      return getForecastData(forecastParams)
        .then(function(data) {
          return _.slice(data.futureForecasts, 0, numDays);
        });
    }; // getForecast()

  }]);
