'use strict';

/**
 * @ngdoc filter
 * @name weatherForeYouApp.filter:weatherCloudsFilter
 * @function
 * @description
 * # weatherCloudsFilter
 * Takes a cloudCover index from the forecast data and gives back a human
 * readable description of the state of the clouds outside.
 */
angular.module('weatherForeYouApp')
  .filter('weatherCloudsFilter',
  ['config', 'weatherCodeService',
  function (config, weatherCodeService) {
    return function (input) {

      return config.HUMAN_CODES.CLOUDS[weatherCodeService.getCloudLevel(input)];

    };
  }]);
