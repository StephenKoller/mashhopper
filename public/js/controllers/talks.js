'use strict';

angular.module('mean.talks').controller('TalksController', ['$routeParams', '$location', 'Global', 'Talks', function ($routeParams, $location, Global, Talks) {
	var vm = this;
    vm.global = Global;
    vm.update = function(){
    	console.log('wired');
    	  // var article = $scope.article;
       //  if (!article.updated) {
       //      article.updated = [];
       //  }
       //  article.updated.push(new Date().getTime());

       //  article.$update(function() {
       //      $location.path('articles/' + article._id);
       //  });
	

    };
    Talks.query(function(data) {
    	vm.talks = data;
  	});
  	return vm;
}]);