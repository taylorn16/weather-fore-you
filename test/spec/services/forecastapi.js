'use strict';

describe('Service: forecastAPI', function () {

  // load the service's module
  beforeEach(module('weatherForeYouApp'));

  // instantiate service
  var forecastAPI;
  beforeEach(inject(function (_forecastAPI_) {
    forecastAPI = _forecastAPI_;
  }));

  it('should do something', function () {
    expect(!!forecastAPI).toBe(true);
  });

});
