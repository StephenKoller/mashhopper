'use strict';

angular.module('mean.talks').controller('TalksController', ['$routeParams', '$location', 'Global', 'CodemashTalks', function ($routeParams, $location, Global, CodemashTalks) {
	var vm = this;
    vm.global = Global;
    vm.talks = CodemashTalks.getTalksAsync().then(function(d) {
    	vm.talks = d;
  	});
  	return vm;
}]);