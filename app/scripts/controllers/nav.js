'use strict';

/**
 * @ngdoc function
 * @name weatherForeYouApp.controller:NavctrlCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the weatherForeYouApp
 */
angular.module('weatherForeYouApp')
  .controller('NavCtrl',
  ['config', '$rootScope',
  function (config, $rootScope) {
    var vm = this;

    // Function user will trigger on clicking the set location button
    vm.triggerSetLocationEvent = function() {
      $rootScope.$broadcast(config.EVENTS.SET_LOCATION);
    };

  }]);
