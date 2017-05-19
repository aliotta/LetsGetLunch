'use strict';

/**
 * @ngdoc function
 * @name appartmentListLunchAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appartmentListLunchAppApp
 */
angular.module('appartmentListLunchAppApp')
.controller('MainCtrl', function ($scope) {
  $scope.lunchGroups = [[{firstName: 'Alex', lastName: 'L'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]];
});

