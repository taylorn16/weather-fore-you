'use strict';

/**
 * @ngdoc filter
 * @name weatherForeYouApp.filter:weatherIconFilter
 * @function
 * @description
 * # weatherIconFilter
 * Takes a cloudCover index from the weather forecast and converts it into an
 * icon code used for the meteocon corresponding to the cloud level.
 */
angular.module('weatherForeYouApp')
  .filter('weatherIconFilter',
  ['config', 'weatherCodeService',
  function (config, weatherCodeService) {
    return function (input, isCurrent) {
      isCurrent = isCurrent || false;

      var cloudLevel = weatherCodeService.getCloudLevel(input),
          hours = (new Date()).getHours();

      if (isCurrent === true) {
        return config.HUMAN_CODES.ICONS.DAY[cloudLevel];
      }

      if (hours >= 7 && hours <= 19) {                        // If it is daytime (if the sun is up)
        return config.HUMAN_CODES.ICONS.DAY[cloudLevel];
      } else {
        return config.HUMAN_CODES.ICONS.NIGHT[cloudLevel];
      }

    };
  }]);
