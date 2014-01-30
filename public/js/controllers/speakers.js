'use strict';

angular.module('mean.speakers').controller('SpeakersController', ['$scope', '$routeParams', '$location', 'Global', '$http',
    function($scope, $routeParams, $location, Global, $http) {
        $scope.global = Global;

        $scope.find = function() {
            $http.get('http://rest.codemash.org/api/speakers.json').success(function(speakers) {
                $scope.speakers = speakers;
            });
        };
        $scope.findAll = function(){
            $http.get('/views/speakers/speakers.json').success(function(speakers){
                $scope.speakers = speakers;
            });
        };

        $scope.findOne = function() {

            $http.get('http://rest.codemash.org/api/speakers.json/' + $routeParams.speakerName).success(function(speaker) {
                $scope.speaker = speaker[0];
            });
        };
    }
]);
