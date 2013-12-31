'use strict';

angular.module('mean.talks').controller('TalksController', ['$scope', '$routeParams', '$location', 'Global', 'Talks', '$http', function ($scope, $routeParams, $location, Global, Talks, $http) {
    $scope.global = Global;

    $http.get('http://rest.codemash.org/api/sessions.json').success(function(talks) {
        console.log(talks);
        $scope.talks = talks;
    });
}]);