'use strict';

describe('Filter: percentFilter', function () {

  // load the filter's module
  beforeEach(module('weatherForeYouApp'));

  // initialize a new instance of the filter before each test
  var percentFilter;
  beforeEach(inject(function ($filter) {
    percentFilter = $filter('percentFilter');
  }));

  it('should return the input prefixed with "percentFilter filter:"', function () {
    var text = 'angularjs';
    expect(percentFilter(text)).toBe('percentFilter filter: ' + text);
  });

});
