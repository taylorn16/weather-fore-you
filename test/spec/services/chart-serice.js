'use strict';

describe('Service: chartSerice', function () {

  // load the service's module
  beforeEach(module('weatherForeYouApp'));

  // instantiate service
  var chartSerice;
  beforeEach(inject(function (_chartSerice_) {
    chartSerice = _chartSerice_;
  }));

  it('should do something', function () {
    expect(!!chartSerice).toBe(true);
  });

});
