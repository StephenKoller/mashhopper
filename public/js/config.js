'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/speakers', {
            templateUrl: 'views/speakers/list.html'
        }).
        when('/speakers/:speakerId', {
            templateUrl: 'views/speakers/view.html'
        }).
        when('/talks', {
            templateUrl: 'views/talks/list.html'
        }).
        // when('/', {
        //     templateUrl: 'views/index.html'
        // }).
        otherwise({
            redirectTo: '/talks'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);