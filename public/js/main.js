'use strict';

require.config({
	paths:{
		'angular'		: '../libs/angular/angular',
        'angular-jwt'       : '../libs/angular-jwt/dist/angular-jwt.min',
		'ui.router'		: '../libs/ui-router/release/angular-ui-router',
		'ngStorage'		: '../libs/ngstorage/ngStorage',
		'app'			: 'app',
		'auth'			: 'auth/authCtrl',
		'auth.api'		: 'auth/authFact'
	},
	shim: {
        'angular': {
        	exports: 'angular'
        },
        'ui.router': {
        	deps: ['angular']
        },
        'ngStorage': {
        	deps: ['angular']
        },
        'auth': {
        	deps: ['angular']
        },
        'angular-jwt': {
            deps: ['angular']
        },
        'auth.api': {
        	deps: ['angular','ngStorage']
        },
        'app': {
        	deps:['angular','ui.router','auth','auth.api','angular-jwt']
        },
    }
});


require(['./app'],function(){
      angular.bootstrap(document, ['portfolio']);
});