'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.chartSerice
 * @description
 * # chartSerice
 * Service in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .service('chartService',
  ['$filter', '$log',
  function ($filter, $log) {

    this.getChartOptionsFromForecast = function(forecastDays) {
      var chartOptions = {
        labels: [],
        series: ['Highs', 'Lows'],
        data: [[], []]
      };

      forecastDays.forEach(function(day) {
        chartOptions.labels.push($filter('date')(day.date, 'EEEE'));
        chartOptions.data[0].push(day.temperatureMax);
        chartOptions.data[1].push(day.temperatureMin);
      });

      return chartOptions;
    };


  }]);
