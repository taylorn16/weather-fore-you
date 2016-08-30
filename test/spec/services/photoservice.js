'use strict';

describe('Service: photoService', function () {

  // load the service's module
  beforeEach(module('weatherForeYouApp'));

  // instantiate service
  var photoService;
  beforeEach(inject(function (_photoService_) {
    photoService = _photoService_;
  }));

  it('should do something', function () {
    expect(!!photoService).toBe(true);
  });

});
