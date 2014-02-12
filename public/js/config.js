'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/speakers', {
            templateUrl: 'views/speakers/list.html'
        }).
        when('/speakers/:speakerId', {
            templateUrl: 'views/speakers/view.html'
        }).
        when('/graphs', {
            templateUrl: 'views/graphs/list.html'
        }).
        when('/talks', {
            templateUrl: 'views/talks/list.html'
        }).
        when('/talks/:talkId', {
            templateUrl: 'views/talks/view.html'
        }).
        when('/profile',{
            templateUrl: 'views/user/profile.html'
        }).
        when('/schedule', {
            templateUrl: 'views/schedule/schedule.html'
        }).
        when('/chat', {
            templateUrl: 'views/chat/chat.html'
        }).
        when('/leaderboard', {
            templateUrl: 'views/leaderboard/leaderboard.html'
        }).
        when('/landing', {
            templateUrl: 'views/landing.html'
        }).
        otherwise({
            redirectTo: function(){return window.user.showLandingPage ? '/landing' : '/talks'}()
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
