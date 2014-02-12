'use strict';

angular.module('mean.landing').controller('LandingController', ['$scope', '$location', 'Global', 'User',
    function($scope, $location, Global, User) {
        $scope.global = Global;

        $scope.update = function() {
        	$scope.global.user.showLandingPage = !$scope.global.user.showLandingPage;
            User.toggleLandingPage();
            $location.url('/talks');
        };
    }
]);