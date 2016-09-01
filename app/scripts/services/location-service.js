'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.locationService
 * @description
 * # locationService
 * Simply an interface layer over the localStorage HTML5 database.
 */
angular.module('weatherForeYouApp')
  .service('locationService', function ($rootScope, config) {

    // Access the HTML5 webstorage DB and store the locationId
    this.setLocation = function(locationId) {
      if (localStorage.getItem('locationId') !== locationId) {
        // Let everyone know that the location was set to a new place
        localStorage.setItem('locationId', locationId);
        $rootScope.$broadcast(config.EVENTS.LOCATION_SET);
        return;
      } else {
        return null;
      }
    }; // setLocation()

    // Access the HTML5 webstorage DB and get the locationId
    this.getLocation = function() {
      if (localStorage.getItem('locationId')) {
        return localStorage.getItem('locationId');
      } else {
        return null;
      }
    }; // getLocation()

  });
