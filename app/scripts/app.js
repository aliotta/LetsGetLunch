'use strict';

/**
 * @ngdoc overview
 * @name appartmentListLunchApp
 * @description
 * # appartmentListLunchApp
 *
 * Main module of the application.
 */
var app = angular.module('appartmentListLunchApp', ['ngRoute']);
app.config(function($routeProvider ,$locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/user/create', {
    templateUrl: 'views/createuser.html',
    controller: 'CreateUserCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html'
  })
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
});
