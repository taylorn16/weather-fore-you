'use strict';

describe('Directive: forecastCard', function () {

  // load the directive's module
  beforeEach(module('weatherForeYouApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<forecast-card></forecast-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the forecastCard directive');
  }));
});
