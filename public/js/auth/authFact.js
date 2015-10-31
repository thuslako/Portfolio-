'use strict';

define(function(){
		angular.module('auth.api',['ngStorage']).factory('authFactory',['$http','$location',function($http,$location){

			var auth = {};
			var token;
			auth.join = function (user){
			    return $http.post('/api/admin/users',user).then(function(token){
					
			    	$location.path('/login');
			    	
			    },function(err){
			    	return token='can/"t join';
			    });
			};
			auth.login = function (user){
			    return $http.post('/api/auth',user).then(function(token){
			    	if(!window.localStorage.getItem('auth-token')){
			    		window.localStorage.setItem('auth-token',token.data);
			    	}
			    	$location.path('/join');
			    	
			    },function(err){
			    	return token='wrong email or password';
			    });
			};
			auth.validateToken = function (id){
			    return $http.get('/api/admin/user'+ id);
			};

			auth.logout = function (){
			    window.localStorage.removeItem('auth-token');
			    $location.path('/');
			};

			return auth; 
		}]);    
});
