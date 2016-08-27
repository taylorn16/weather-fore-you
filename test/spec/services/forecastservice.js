'use strict';

describe('Service: forecastService', function () {

  // load the service's module
  beforeEach(module('weatherForeYouApp'));

  // instantiate service
  var forecastService;
  beforeEach(inject(function (_forecastService_) {
    forecastService = _forecastService_;
  }));

  it('should do something', function () {
    expect(!!forecastService).toBe(true);
  });

});
