'use strict';

describe('UserService', function () {

  // load the controller's module
  beforeEach(module('appartmentListLunchApp'));

  var UserService;
  var scope;
  var apiCallPromise;
  var doApiCallSpy;
  var mockUserData = {data : [[{firstName: 'CLIENT', lastName: 'SIDE'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]]};

  beforeEach(inject(function (_UserService_, ApiCalls, $q, $rootScope) {
    scope = $rootScope.$new();
    UserService = _UserService_;
    doApiCallSpy = spyOn(ApiCalls, "doApiCall").and.callFake(function() {
        apiCallPromise = $q.defer();
        return apiCallPromise.promise;
    });
  }));

  it('User service should make an apiCall with proper params and set result as object on the service', function (done) {
    UserService.getLunchGroups()
    .then(function(){
      expect(doApiCallSpy).toHaveBeenCalledWith('user/random', 'GET');
      expect(UserService.lunchGroups.length).toBe(mockUserData.data.length);
      done();
    });
    apiCallPromise.resolve(mockUserData);
    //digest is needed to resolve the promise
    scope.$digest();
  });

});