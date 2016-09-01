'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.cityService
 * @description
 * # cityService
 * Service in the weatherForeYouApp.
 */
angular.module('weatherForeYouApp')
  .service('cityService',
  ['$http', 'config', '$log',
  function ($http, config, $log) {

    // Gets all API prediction information for a city search by name
    function getCitySearchData(name) {
      return $http({
        method: 'GET',
        url: config.CITIES.SEARCH_API_URL,
        params: {byName: name}
      })
        .then(function(response) {
          if (response.data.error_message) {
            $log.warn(response.data.error_message);
          }
          else {
            return response.data.predictions;
          }
        })
        .catch(function(error) { return error.message; });
    };

    // Gets all API info about the given city id
    function getCityInfoById(id) {
      return $http({
        method: 'GET',
        url: config.CITIES.ID_API_URL + id
      })
        .then(function(response) {
          if (response.error_message) {
            $log.warn(response.error_message);
          } else {
            return response.data.result;
          }
        })
        .catch(function(error) { return error.message; });
    };

    // Get only names and IDs of the returned predicitions
    this.getSearchResultsFor = function(city) {
      return getCitySearchData(city)
        .then(function(predictions) {
          function getNameAndId(elem) {
            return {
              name: elem.description,
              id: elem.place_id
            };
          };

          return _.map(predictions, getNameAndId);
        });
    }; // getSearchResultsFor()

    // Get only latitude and longitude of a city by ID
    this.getLatAndLongById = function(id) {
      return getCityInfoById(id)
        .then(function(data) {
          var loc = data.geometry.location;
          return {
            latitude: loc.lat,
            longitude: loc.lng
          };
        });
    }; // getLatAndLongById()

    this.getPhotosById = function(id) {
      return getCityInfoById(id)
        .then(function(data) {
          return data.photos;
        });
    }; // getPhotosById()

    this.getAddressById = function(id) {
      return getCityInfoById(id)
        .then(function(data) {
          return data.formatted_address;
        });
    }; // getAddressById()

  }]);
