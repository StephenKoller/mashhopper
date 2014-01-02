'use strict';

angular.module('mean.talks').controller('TalksController', ['$scope', '$routeParams', '$location', 'Global', 'Talks', 'User', function ($scope, $routeParams, $location, Global, Talks, User) {
	
    $scope.global = Global;

    $scope.colors =  { '.NET' : 'dot-net', 'Cool Stuff' :'cool-stuff', 'Testing' : 'testing'};

    //talk.Technology

    $scope.style = function(index) {
        var talk = $scope.talks[index];
        console.log(talk);
        console.log($scope.colors[talk.Technology]);
        return $scope.colors[talk.Technology];
    };

    $scope.update = function(index){
    	var talk = $scope.talks[index];
    	var user = $scope.global.user;

    	if(_.contains(user.talks, talk.Id))
    		_.without(user.talks, talk.Id);
    	else
    		user.talks.push(talk.Id);

    	User.save(user);
        //$scope.setStyle();
    };

    $scope.setStyle = function(index){
        var talk = $scope.talks[index];
        var user = $scope.global.user;
        return _.contains(user.talks, talk.Id);
    };

    Talks.query(function(data) {
    	$scope.talks = data;
  	});
  	//return vm;
}]);