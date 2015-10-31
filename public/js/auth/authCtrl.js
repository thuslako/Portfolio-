'use strict';

define(function(){
	angular.module('auth',[]).controller('authCtrl',['$scope','authFactory',function($scope,authFactory){
		$scope.user = {email:'',password_hash:'',name:''};
		$scope.msg ='';
		$scope.submit2 = function(user) {
			authFactory.join(user).then(function(res){
	        	$scope.token = res;
			},function(err){
				$scope.token = err.data;
			});
		}
		$scope.submit = function(user) {
			authFactory.login(user).then(function(res){
	        	$scope.token = res;
			},function(err){
				$scope.token = err.data;
			});
		}

	  }]);
});

