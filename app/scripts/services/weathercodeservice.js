'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.weatherCodeService
 * @description
 * # weatherCodeService
 * Service in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .service('weatherCodeService',
  ['$log', 'config',
  function ($log, config) {

    function getCloudLevel(cloudCoverIndex) {
      if (cloudCoverIndex <= 0.25) {
        return '10';
      } else if (cloudCoverIndex <= 0.50) {
        return '20';
      } else if (cloudCoverIndex <= 0.75) {
        return '30';
      } else {
        return '40';
      }
    };

    this.getCloudCode = function(cloudCoverIndex) {
      return config.HUMAN_CODES.CLOUDS[getCloudLevel(cloudCoverIndex)];
    };

    this.getIconCode = function(cloudCoverIndex) {
      var cloudLevel = getCloudLevel(cloudCoverIndex),
          hours = (new Date()).getHours();

      if (hours >= 7 && hours <= 19) {
        return config.HUMAN_CODES.ICONS.DAY[cloudLevel];
      } else {
        return config.HUMAN_CODES.ICONS.NIGHT[cloudLevel];
      }
    };

  }]);
