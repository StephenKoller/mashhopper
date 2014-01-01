'use strict';

angular.module('mean.talks').controller('TalksController', ['$scope', '$routeParams', '$location', 'Global', 'CodemashTalks', function ($scope, $routeParams, $location, Global, CodemashTalks) {
    $scope.global = Global;
    CodemashTalks.getTalksAsync().then(function(d) {
    	$scope.talks = d;
  	});
}]);