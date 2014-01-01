angular.module('codemash.talks').factory('CodemashTalks', function($http){
	return {
		getTalksAsync: function(){
			var promise = $http.get('http://rest.codemash.org/api/sessions.json', { cache: true}).then(function (response) {
				// The then function here is an opportunity to modify the response
				console.log(response);
				// The return value gets picked up by the then in the controller.
				return response.data;
			});
			// Return the promise to the controller
			return promise;
		}
	}
});