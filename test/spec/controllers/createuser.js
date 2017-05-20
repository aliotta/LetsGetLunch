'use strict';

describe('Controller: CreateuserCtrl', function () {

  // load the controller's module
  beforeEach(module('appartmentListLunchApp'));

  var CreateuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateuserCtrl = $controller('CreateuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateuserCtrl.awesomeThings.length).toBe(3);
  });
});
