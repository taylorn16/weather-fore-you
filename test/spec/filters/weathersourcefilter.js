'use strict';

describe('Filter: weatherSourceFilter', function () {

  // load the filter's module
  beforeEach(module('weatherForeYouApp'));

  // initialize a new instance of the filter before each test
  var weatherSourceFilter;
  beforeEach(inject(function ($filter) {
    weatherSourceFilter = $filter('weatherSourceFilter');
  }));

  it('should return the input prefixed with "weatherSourceFilter filter:"', function () {
    var text = 'angularjs';
    expect(weatherSourceFilter(text)).toBe('weatherSourceFilter filter: ' + text);
  });

});
