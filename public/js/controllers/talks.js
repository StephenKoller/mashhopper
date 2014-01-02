'use strict';

angular.module('mean.talks').controller('TalksController', ['$routeParams', '$location', 'Global', 'Talks', 'User', function ($routeParams, $location, Global, Talks, User) {
	var vm = this;
    vm.global = Global;

    vm.update = function(index){
    	var talk = vm.talks[index];
    	var user = vm.global.user;

    	if(_.contains(user.talks, talk.Id))
    		_.without(user.talks, talk.Id);
    	else
    		user.talks.push(talk.Id);

    	User.save(user);
    };

    Talks.query(function(data) {
    	vm.talks = data;
  	});
  	return vm;
}]);