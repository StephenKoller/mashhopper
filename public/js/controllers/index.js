'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http', function ($scope, Global, $http) {
    $scope.global = Global;
    $scope.message = 'Welcome to CodeMash!';
}]);