'use strict';

/**
 * @ngdoc function
 * @name appartmentListLunchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appartmentListLunchApp
 */
angular.module('appartmentListLunchApp')
.controller('MainCtrl', function ($scope, ApiCalls) {
  $scope.lunchGroups = [[{firstName: 'CLIENT', lastName: 'SIDE'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]];
  $scope.getLunchGroups = function(){
    ApiCalls.doApiCall('user/random', 'GET')
    .then(function(res){
      $scope.lunchGroups = res.data;
    });
  }
});

