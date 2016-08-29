'use strict';

/**
 * @ngdoc directive
 * @name weatherForeYouApp.directive:forecastCard
 * @description
 * # forecastCard
 */
angular.module('weatherForeYouApp')
  .directive('forecastCard', function() {
    return {
      templateUrl: 'views/forecast-card.html',
      restrict: 'EA',
      scope: {
        vm: '=forecast'
      }
      }
  });
