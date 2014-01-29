'use strict';

angular.module('mean.users').controller('UserProfileController', ['$scope', '$routeParams', '$location', '$modal', '$http', 'Global', '_',
    function($scope, $routeParams, $location, $modal, $http, Global, _) {
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
        $scope.removeProvider = function(provider){
            console.log('going to remove provider '+provider.key);
            $scope.providerStatus = _.countBy($scope.providers, function(prov){if($scope.isLinked(prov)){return 'linked';}else{return 'notLinked';}});
            $scope.currentProvider=provider;
            $scope.myModal = $modal.open({
                scope: $scope,
                templateUrl: 'views/user/infoModal.html'
            });
        };
        $scope.cancelRemove = function(){
            $scope.myModal.close('cancel');
        };
        $scope.performRemove = function(){
            $scope.user[$scope.currentProvider.key] = null;
            $scope.myModal.close('remove');
            $scope.updateProfile();
        };
    }
]);
