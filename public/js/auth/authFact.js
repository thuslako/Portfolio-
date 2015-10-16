'use strict';

define(function(){
		angular.module('auth.api',[]).factory('authFactory',['$http',function($http){

			var auth = {};
			var token = '';
			var err = 'Wrong pass or email';

			auth.login = function (user){
			    return $http.post('/api/auth',user).then(function(newtoken){
			    	return token = newtoken.data;
			    },function(err){
			    	return err;
			    });
			};
			auth.validateToken = function (id){
			    return $http.get('/api/admin/user'+ id);
			};
			auth.logout = function (user){
			    return $http.post('/api/parts', user);
			};

			return auth; 
		}]);    
});
