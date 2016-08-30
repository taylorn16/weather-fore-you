'use strict';

/**
 * @ngdoc filter
 * @name weatherForeYouApp.filter:percentFilter
 * @function
 * @description
 * # percentFilter
 * Filter in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .filter('percentFilter', function () {
    return function (input) {
      return input * 100;
    };
  });
