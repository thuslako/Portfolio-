'use strict';

define(function(){
  angular.module('portfolio', ['ui.router','auth','auth.api','ngStorage','angular-jwt'])
  .config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider','jwtInterceptorProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider,jwtInterceptorProvider){
       $urlRouterProvider.otherwise("/login");


       jwtInterceptorProvider.tokenGetter = function(){
          return localStorage.getItem('auth-token');
        }

       $httpProvider.interceptors.push('jwtInterceptor');

       $stateProvider
       .state('login', {
          url: "/login",
          templateUrl: "views/user/login.form.html",
          skipAuthorization: true,
          controller:'authCtrl'
        }).state('join', {
          url: "/join",
          templateUrl: "views/user/join.form.html",
          skipAuthorization: true,
          controller:'authCtrl'
        });
       $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
  }]);

});
