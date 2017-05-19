'use strict';

/**
 * @ngdoc overview
 * @name appartmentListLunchAppApp
 * @description
 * # appartmentListLunchAppApp
 *
 * Main module of the application.
 */
var app = angular.module('appartmentListLunchAppApp', ['ngRoute']);
app.config(function($routeProvider ,$locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  })
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  });
});
