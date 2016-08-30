'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.weatherCodeService
 * @description
 * # weatherCodeService
 * Service in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .service('weatherCodeService', [function (config) {

    this.getCloudLevel = function(cloudCoverIndex) {
      if (cloudCoverIndex <= 0.25) { return '10'; }
      else if (cloudCoverIndex <= 0.50) { return '20'; }
      else if (cloudCoverIndex <= 0.75) { return '30'; }
      else { return '40'; }
    };


  }]);
