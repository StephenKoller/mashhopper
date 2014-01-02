'use strict';

angular.module('mean.talks').controller('TalksController', ['$scope', '$routeParams', '$location', 'Global', 'Talks', 'User', function ($scope, $routeParams, $location, Global, Talks, User) {
    $scope.global = Global;
    $scope.colors =  { '.NET' : 'dot-net', 'Cool Stuff' :'cool-stuff', 'Testing' : 'testing'};
    $scope.radioModel = 'Left';

    $scope.style = function(talk) {
        console.log(talk);
        console.log($scope.colors[talk.Technology]);
        return $scope.colors[talk.Technology];
    };

    $scope.update = function(talk){
    	var user = $scope.global.user;
    	if(_.contains(user.talks, talk.Id))
    		_.without(user.talks, talk.Id);
    	else
    		user.talks.push(talk.Id);

    	User.save(user);
    };

    $scope.setStyle = function(talk){
        var user = $scope.global.user;
        return _.contains(user.talks, talk.Id);
    };

    Talks.query(function(data) {
    	$scope.talks = data;
  	});
  	//return vm;
}]);