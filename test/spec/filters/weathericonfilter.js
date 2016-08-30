'use strict';

describe('Filter: weatherIconFilter', function () {

  // load the filter's module
  beforeEach(module('weatherForeYouApp'));

  // initialize a new instance of the filter before each test
  var weatherIconFilter;
  beforeEach(inject(function ($filter) {
    weatherIconFilter = $filter('weatherIconFilter');
  }));

  it('should return the input prefixed with "weatherIconFilter filter:"', function () {
    var text = 'angularjs';
    expect(weatherIconFilter(text)).toBe('weatherIconFilter filter: ' + text);
  });

});
