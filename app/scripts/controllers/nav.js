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
  ['config', '$scope', '$rootScope', 'cityService', 'locationService',
  function (config, $scope, $rootScope, cityService, locationService) {
    var vm = this;

    vm.currentLocation = 'Not Set';

    // Function user will trigger on clicking the set location button
    vm.triggerSetLocationEvent = function() {
      $rootScope.$broadcast(config.EVENTS.SET_LOCATION);
    };

    function init() {
      if (locationService.getLocation()) {
        cityService.getAddressById(locationService.getLocation()).then(function(address) {
          vm.currentLocation = address.substring(0, 20) + '...';
        });
      }
    }; // init()

    init();

    // Listen for a response back when the location is set
    // a "LOCATION_SET" event
    $rootScope.$on(config.EVENTS.LOCATION_SET, function() {
      vm.currentLocation = 'Not Set';
      cityService.getAddressById(locationService.getLocation()).then(function(address) {
        vm.currentLocation = address.substring(0, 20) + '...';
      });
    });

  }]);
