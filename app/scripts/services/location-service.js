'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.locationService
 * @description
 * # locationService
 * Simply an interface layer over the localStorage HTML5 database.
 */
angular.module('weatherForeYouApp')
  .service('locationService', function () {

    // Access the HTML5 webstorage DB and store the locationId
    this.setLocation = function(locationId) {
      if (localStorage.getItem('locationId') !== locationId) {
        return localStorage.setItem('locationId', locationId);
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
