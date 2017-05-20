'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('appartmentListLunchApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    var mockUserData = {data : [[{firstName: 'CLIENT', lastName: 'SIDE'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]]};
    scope.doApiCall = function(){
      return mockUserData;
    };
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach returned users to the scope', function () {
    scope.getLunchGroups();
    expect(scope.lunchGroups.length).toBe(mockUserData.length);
  });
});
