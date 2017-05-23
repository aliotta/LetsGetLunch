'use strict';

/**
 * @ngdoc function
 * @name appartmentListLunchApp.controller:CreateuserCtrl
 * @description
 * # CreateuserCtrl
 * Controller of the appartmentListLunchApp
 */
angular.module('appartmentListLunchApp')
.controller('CreateUserCtrl', function ($scope, ApiCalls) {
  $scope.createUser = function(firstName, lastName, team){
    ApiCalls.doApiCall('user/create', 'POST', {firstName: firstName, lastName: lastName, team: team})
    .then(function(res){
      alert('creation sucessful');      
    })
    .catch(function(err){
      alert('creation failed first and last name are required');
    });
  }
});
