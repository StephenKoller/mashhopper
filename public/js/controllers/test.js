'use strict';

angular.module('mean.system').controller('TestController', ['$scope', 'Global', '$http', function ($scope, Global, $http) {
    $scope.global = Global;
    $http.post('/addTalk', {id: '61161a18-d25b-4dbd-bc74-45b248a20b65'}).success(function(data){
		$scope.message = 'Success! + ' + data.incoming;
    });
    
}]);