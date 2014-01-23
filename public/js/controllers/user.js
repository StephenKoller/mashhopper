'use strict';

angular.module('mean.users').controller('UserProfileController', ['$scope', '$routeParams', '$location', '$modal', '$http', 'Global',
    function($scope, $routeParams, $location, $modal, $http, Global) {
        $scope.global = Global;
        $scope.providers = [{
            key: 'google',
            icon: '/img/icons/google.png'
        }, {
            key: 'github',
            icon: '/img/icons/github.png'
        }, {
            key: 'twitter',
            icon: '/img/icons/twitter.png'
        }, {
            key: 'linkedin',
            icon: '/img/icons/linkedin.png'
        }, {
            key: 'facebook',
            icon: '/img/icons/facebook.png'
        }];
        $scope.user = $scope.global.user;
        $scope.isLinked = function(provider) {
            return $scope.user[provider.key] && $scope.user[provider.key].id;
        };
        $scope.isNotLinked = function(provider) {
            return !$scope.isLinked(provider);
        };
        $scope.updateProfile = function(){
            $http.post('/users/'+$scope.user._id, $scope.user).success($scope.showSuccessMessage).error($scope.showFailureMessage);
        };
        $scope.showSuccessMessage = function(){
            console.log('woopy');
        };
        $scope.showFailureMessage = function(){
            console.log('bogus');
        };
    }
]);
