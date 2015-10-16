'use strict';

define(function(){
  angular.module('portfolio', ['ui.router','auth','auth.api'])
  .config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
       $urlRouterProvider.otherwise("/login");

       $stateProvider
       .state('login', {
          url: "/login",
          templateUrl: "views/user/login.form.html",
          controller:'authCtrl'
        }).state('join', {
          url: "/join",
          templateUrl: "views/user/join.form.html"
        });
       $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
  }]);

});
