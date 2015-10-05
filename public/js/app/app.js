'use strict';

angular.module("folioapp", ['ui.router','ngSanitize'])
.config(function($stateProvider,$urlRouterProvider){
	 $urlRouterProvider.otherwise("/login");
	 $stateProvider.state('login', {
      url: "/login",
      templateUrl: "views/user/login.form.html"
    })
});