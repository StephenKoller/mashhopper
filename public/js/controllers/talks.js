'use strict';

angular.module('mean.talks').controller('TalksController', ['$routeParams', '$location', 'Global', 'Talks', 'User', function ($routeParams, $location, Global, Talks, User) {
	var vm = this;
    vm.global = Global;

    vm.colors =  { '.NET' : 'dot-net', 'Cool Stuff' :'cool-stuff', 'Testing' : 'testing'};

    //talk.Technology

    vm.style = function(index) {
        var talk = vm.talks[index];
        console.log(talk);
        console.log(vm.colors[talk.Technology]);
        return vm.colors[talk.Technology];
    };

    vm.update = function(index){
    	var talk = vm.talks[index];
    	var user = vm.global.user;

    	if(_.contains(user.talks, talk.Id))
    		_.without(user.talks, talk.Id);
    	else
    		user.talks.push(talk.Id);

    	User.save(user);
        vm.setStyle();
    };

    vm.setStyle = function(index){
        var talk = vm.talks[index];
        var user = vm.global.user;
        return _.contains(user.talks, talk.Id);
    };

    Talks.query(function(data) {
    	vm.talks = data;
  	});
  	return vm;
}]);