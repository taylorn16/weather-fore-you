'use strict';

describe('Service: cityService', function () {

  // load the service's module
  beforeEach(module('weatherForeYouApp'));

  // instantiate service
  var cityService;
  beforeEach(inject(function (_cityService_) {
    cityService = _cityService_;
  }));

  it('should do something', function () {
    expect(!!cityService).toBe(true);
  });

});
