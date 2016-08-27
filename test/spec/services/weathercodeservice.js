'use strict';

describe('Service: weatherCodeService', function () {

  // load the service's module
  beforeEach(module('weatherForeYouApp'));

  // instantiate service
  var weatherCodeService;
  beforeEach(inject(function (_weatherCodeService_) {
    weatherCodeService = _weatherCodeService_;
  }));

  it('should do something', function () {
    expect(!!weatherCodeService).toBe(true);
  });

});
