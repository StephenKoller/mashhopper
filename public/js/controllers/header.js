'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Talks',
        'link': 'talks'
    }, {
        'title': 'Speakers',
        'link': 'speakers'
    }];
    
    $scope.isCollapsed = false;
}]);