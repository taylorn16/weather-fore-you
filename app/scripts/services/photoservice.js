'use strict';

/**
 * @ngdoc service
 * @name weatherForeYouApp.photoService
 * @description
 * # photoService
 * Grabs a photo from the google places API for use in the app.
 */
angular.module('weatherForeYouApp')
  .service('photoService', ['config', 'cityService',
  function (config, cityService) {

    // Get a google places photo reference key by city id
    function getReferenceById(id) {
      return cityService.getPhotosById(id).then(function(photos) {
        if (photos) {
          return photos[0].photo_reference;             // Just pick the first photo in the array
        } else {
          return '';
        }
      });
    };

    // Get a photo url by google place reference key
    this.getPhotoUrlById = function(id) {
      return getReferenceById(id).then(function(reference) {
        if (reference) {
          return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=' + reference + '&key=' + config.CITIES.PHOTOS.API_KEY;
        } else {
          return 'https://hd.unsplash.com/photo-1462524500090-89443873e2b4';
        }

      });
    };

  }]);
