'use strict';

angular.module('mean.articles').factory('User', function($http){
	return {
		toggleAttending: function(attending, talkId){
		    $http.post('/users/toggle', {adding: attending, talkId: talkId});
		}
	};
});