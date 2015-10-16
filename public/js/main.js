'use strict';

require.config({
	paths:{
		'angular'		: '../libs/angular/angular',
		'ui.router'		: '../libs/ui-router/release/angular-ui-router',
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
        'auth': {
        	deps: ['angular']
        },
        'auth.api': {
        	deps: ['angular']
        },
        'app': {
        	deps:['angular','ui.router','auth','auth.api']
        },
    }
});


require(['./app'],function(){
      angular.bootstrap(document, ['portfolio']);
});