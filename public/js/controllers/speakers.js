'use strict';

angular.module('mean.speakers').controller('SpeakersController', ['$scope', '$routeParams', '$location', 'Global', 'Articles', function ($scope, $routeParams, $location, Global, Articles) {
    $scope.global = Global;

    if ($routeParams.speakerName) {
        $scope.name = $routeParams.speakerName;

        $http.get('http://rest.codemash.org/api/speakers.json/' + $scope.name).success(function(speaker) {
            $scope.speakers = [speaker[0]];
            // console.log(speaker);
        });
    } else {
        $http.get('http://rest.codemash.org/api/speakers.json').success(function(speakers) {
            $scope.speakers = speakers;
        });
    }
}]);