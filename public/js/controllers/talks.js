'use strict';

angular.module('mean.talks').controller('TalksController', ['$routeParams', '$location', 'Global', 'Talks', function ($routeParams, $location, Global, Talks) {
	var vm = this;
    vm.global = Global;
    Talks.query(function(data) {
    	vm.talks = data;
  	});
  	return vm;
}]);