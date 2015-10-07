'use strict';

angular.module("folioapp", ['ui.router','ngSanitize'])
.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	 $urlRouterProvider.otherwise("/login");

	 $stateProvider
	 .state('login', {
      url: "/login",
      templateUrl: "views/user/login.form.html"
    }).state('join', {
      url: "/join",
      templateUrl: "views/user/join.form.html"
    });
   $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

});