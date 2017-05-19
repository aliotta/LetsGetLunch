'use strict';

/**
 * @ngdoc function
 * @name appartmentListLunchAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appartmentListLunchAppApp
 */
angular.module('appartmentListLunchAppApp')
.controller('MainCtrl', function ($scope, ApiCalls) {
  $scope.lunchGroups = [[{firstName: 'CLIENT', lastName: 'SIDE'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]];
  $scope.getLunchGroups = function(){
    ApiCalls.doPromiseCall('user/random', 'GET')
    .then(function(res){
      console.log("BACKEND RESP", res.data);
      $scope.lunchGroups = res.data;
    });
  }
});

