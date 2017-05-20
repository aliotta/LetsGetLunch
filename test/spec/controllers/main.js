'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('appartmentListLunchApp'));

  var MainCtrl;
  var scope;
  var mockUserData = {data : [[{firstName: 'CLIENT', lastName: 'SIDE'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]]};
  var getLunchGroupsCallCount = 0;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    getLunchGroupsCallCount = 0;
    scope = $rootScope.$new();
    var UserService = {
      getLunchGroups: function(){
        getLunchGroupsCallCount++;
        var deferred = $q.defer();
        deferred.resolve('Remote call result');
        return deferred.promise;
      }
    }
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      UserService: UserService
      // place here mocked dependencies
    });
  }));

  it('getLunchGroups should call getLunchGroups service function', function () {
    scope.getLunchGroups();
    expect(getLunchGroupsCallCount).toBe(1);
  });
});
