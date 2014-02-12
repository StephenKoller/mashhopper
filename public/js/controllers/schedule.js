'use strict';

angular.module('mean.schedule').controller('ScheduleController', ['$scope', '$routeParams', '$location', '$modal', 'Global', 'Talks', 'User', '_',
    function($scope, $routeParams, $location, $modal, Global, Talks, User, _) {
        $scope.global = Global;
        $scope.colors = {
            '.NET': 'dot-net',
            'Design/UX': 'design',
            'Design (HTML, CSS, etc)': 'design',
            'Cool Stuff': 'cool-stuff',
            'Testing': 'testing',
            'Languages': 'languages',
            'Java': 'java',
            'Mobile': 'mobile',
            'Mobile (Android, iOS, Windows Mobile, etc)': 'mobile',
            'Ruby / Rails': 'ruby',
            'JavaScript': 'javascript',
            'Windows / .NET': 'microsoft',
            'Hardware ( Raspberry Pi, Arduino, etc)': 'hardware',
            'Development Methodologies': 'methodologies',
            'Other': 'other',
            'Soft Skills': 'soft-skills',
            'Python': 'python',
            'Cloud': 'cloud',
            'Continuous Deployment': 'deployment',
            'Mac/iPhone': 'mac'
        };
        $scope.blocks = [];
        $scope.hideUnattending = false;


        $scope.style = function(talk) {
            return $scope.colors[talk.Technology];
        };

        $scope.update = function(talk) {
            var user = $scope.global.user;
            var adding = !_.contains(user.talks, talk.Id);
            if (_.contains(user.talks, talk.Id))
                user.talks = _.without(user.talks, talk.Id);
            else
                user.talks.push(talk.Id);


            User.toggleAttending(adding, talk._id);
        };

        $scope.isAttending = function(talk) {
            var user = $scope.global.user;
            return _.contains(user.talks, talk.Id);
        };

        $scope.showTalk = function(talk) {
            return !$scope.hideUnattending || $scope.isAttending(talk);
        };

        $scope.friday = function(){
            return $scope.talks.filter(function(talk) {
                //return talk >= 10;
            });
        }

        Talks.query(function(data) {
            var user = $scope.global.user;
            var attending = _.filter(data, function(talk){ 

               return _.contains(user.talks, talk._id);
            });
            console.log(attending);
            $scope.talks = attending;
        });

        $scope.openDescription = function(talk) {
            $scope.modalTalk = talk;
            $modal.open({
                scope: $scope,
                templateUrl: 'views/talks/infoModal.html'
            });
        };
    }
]);
