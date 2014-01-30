'use strict';

angular.module('mean.talks').controller('TalksController', ['$scope', '$routeParams', '$location', '$modal', 'Global', 'Talks', 'User', '_',
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
        $scope.radioModel = 'Left';
        $scope.order = 'Start';
        $scope.displayFormat = 'grid';
        $scope.displayFormatStyle=function(format){
            if(format === $scope.displayFormat){
                return ['active'];
            }
        };
        $scope.getDifficultyClasses = function(level){
            if(level === 'Beginner'){
                return ['label label-info'];
            }else if(level === 'Intermediate'){
                return ['label', 'label-warning'];
            }else{
                return ['label', 'label-danger'];
            }
        };

        $scope.style = function(talk) {
            return $scope.colors[talk.Technology];
        };

        $scope.update = function(talk) {
            var user = $scope.global.user;
            
            var adding = !_.contains(user.talks, talk._id);
            if (_.contains(user.talks, talk.Id))
                user.talks = _.without(user.talks, talk._id);
            else
                user.talks.push(talk._id);


            User.toggleAttending(adding, talk._id);
        };

        $scope.isAttending = function(talk) {
            var user = $scope.global.user;
            return _.contains(user.talks, talk._id);
        };
        $scope.sortByAttending = function(talk) {
            var user = $scope.global.user;
            return _.contains(user.talks, talk._id) === false;
        };

        Talks.query(function(data) {
            $scope.talks = data;
        });

        $scope.openDescription = function(talk) {
            $scope.modalTalk = talk;
            $modal.open({
                scope: $scope,
                templateUrl: 'views/talks/infoModal.html'
            });
        };

        $scope.$watch('searchTerm', function(search_string) {
            setTimeout(function() {
                if (search_string === $scope.searchTerm) {
                    $scope.searchTermWithDelay = search_string;
                    $scope.$apply();
                }
            }, 500);
        });
    }
]);
