'use strict';

angular.module('mean.speakers').controller('SpeakersController', ['$scope', '$routeParams', '$location', 'Global', '$http', function ($scope, $routeParams, $location, Global, $http) {
    $scope.global = Global;

    $scope.find = function() {
        /*Articles.query(function(articles) {
            $scope.articles = articles;
        });*/

        $http.get('http://rest.codemash.org/api/speakers.json').success(function(speakers) {
            $scope.speakers = speakers;
        });
    };

    $scope.findOne = function() {
        /*Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
        });*/

        $http.get('http://rest.codemash.org/api/speakers.json/' + $routeParams.speakerName).success(function(speaker) {
            $scope.speaker = speaker[0];
            // console.log(speaker);
        });
    };
}]);