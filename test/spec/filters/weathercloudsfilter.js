'use strict';

describe('Filter: weatherCloudsFilter', function () {

  // load the filter's module
  beforeEach(module('weatherForeYouApp'));

  // initialize a new instance of the filter before each test
  var weatherCloudsFilter;
  beforeEach(inject(function ($filter) {
    weatherCloudsFilter = $filter('weatherCloudsFilter');
  }));

  it('should return the input prefixed with "weatherCloudsFilter filter:"', function () {
    var text = 'angularjs';
    expect(weatherCloudsFilter(text)).toBe('weatherCloudsFilter filter: ' + text);
  });

});
