'use strict';

/**
 * @ngdoc function
 * @name appartmentListLunchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appartmentListLunchApp
 */
angular.module('appartmentListLunchApp')
.controller('MainCtrl', function ($scope, UserService) {
  $scope.userService = UserService;
  $scope.getLunchGroups = function(){
    $scope.userService.getLunchGroups()
    .catch(function(){
      alert('There was an error processing your request');
    })
  }
});

