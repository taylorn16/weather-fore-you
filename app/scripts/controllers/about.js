'use strict';

/**
 * @ngdoc function
 * @name weatherForeYouApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherForeYouApp
 */
angular.module('weatherForeYouApp')
  .controller('AboutCtrl', ['$rootScope', function ($rootScope) {
    $rootScope.page = 'about';
  }]);
