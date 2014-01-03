'use strict';

angular.module('mean.schedule').controller('ScheduleController', ['$scope', '$routeParams', '$location', 'Global', 'Talks', 'User', function ($scope, $routeParams, $location, Global, Talks, User) {
    $scope.global = Global;
    $scope.colors =  { 
        '.NET' : 'dot-net',
        'Design/UX' : 'design',
        'Design (HTML, CSS, etc)' : 'design',
        'Cool Stuff' :'cool-stuff',
        'Testing' : 'testing',
        'Languages' : 'languages',
        'Java' : 'java',
        'Mobile' : 'mobile',
        'Mobile (Android, iOS, Windows Mobile, etc)' : 'mobile',
        'Ruby / Rails' : 'ruby',
        'JavaScript' : 'javascript',
        'Windows / .NET' : 'microsoft',
        'Hardware ( Raspberry Pi, Arduino, etc)' : 'hardware',
        'Development Methodologies' : 'methodologies',
        'Other' : 'other',
        'Soft Skills' : 'soft-skills',
        'Python' : 'python',
        'Cloud' : 'cloud',
        'Continuous Deployment' : 'deployment',
        'Mac/iPhone' : 'mac'
    };

    $scope.style = function(talk) {
        return $scope.colors[talk.Technology];
    };

    Talks.query(function(data) {
        $scope.talks = data;
    });
}]);