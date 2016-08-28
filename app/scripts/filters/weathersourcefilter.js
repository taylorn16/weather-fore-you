'use strict';

/**
 * @ngdoc filter
 * @name weatherForeYouApp.filter:weatherSourceFilter
 * @function
 * @description
 * # weatherSourceFilter
 * Filter in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .filter('weatherSourceFilter', ['config', function (config) {
    return function (input) {

      // Find the matching provider index from the config array and get the name back
      return _.find(config.FORECAST.PROVIDERS, function(provider) { return provider.code === input; }).name;

    };
  }]);
