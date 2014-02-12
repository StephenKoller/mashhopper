'use strict';

angular.module('mean.talks').controller('TalksController', ['$scope', '$routeParams', '$location', '$modal', '$http', 'Global', 'Talks', 'User', '_',
    function($scope, $routeParams, $location, $modal, $http, Global, Talks, User, _) {
        $scope.global = Global;
        $scope.radioModel = 'Left';
        $scope.order = 'Start';
        $scope.displayFormat = 'grid';
        $scope.showingAttending = false;
        $scope.displayFormatStyle = function(format) {
            if (format === $scope.displayFormat) {
                return ['active'];
            }
        };
        $scope.userHasAccount = function(type) {
            if ($scope.global.user[type] && $scope.global.user[type].id) {
                return true;
            }
            return false;
        };
        $scope.getDifficultyClasses = function(level) {
            if (level === 'Beginner') {
                return ['label label-info'];
            } else if (level === 'Intermediate') {
                return ['label', 'label-warning'];
            } else {
                return ['label', 'label-danger'];
            }
        };

        $scope.update = function(talk) {
            var user = $scope.global.user;

            var adding = !_.contains(user.talks, talk._id);
            if (_.contains(user.talks, talk._id))
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

        $scope.filterAttending = function(){
            var user = $scope.global.user;
            if($scope.showingAttending === false){
                //filter
                $scope.showingAttending = true;
                $scope.allTalks = $scope.talks;
                var attending = _.filter($scope.talks, function(talk){ 
                   return _.contains(user.talks, talk._id);
                });
                $scope.talks = attending;    
            } else {
                //clear filter
                $scope.talks = $scope.allTalks;
                $scope.showingAttending = false;
            }
        };

         $scope.filterStyle = function(format) {
            if (format === $scope.showingAttending) {
                return ['btn-primary'];
            }
        };

        $scope.closeModal = function(){
            $scope.currentModal.close();
        };

        $scope.openDescription = function(talk) {
            $scope.modalTalk = talk;
            $scope.currentModal = $modal.open({
                scope: $scope,
                templateUrl: 'views/talks/infoModal.html'
            });
            setTimeout(function() {
                window.twttr.widgets.createShareButton(
                    'http://www.agileandbeyond.com/2014/',
                    document.getElementById('twitterBtn'),
                    function(el) {
                        console.log(el);
                    }, {
                        text: 'I\'m looking forward to the "' + talk.title + '" session at Agile and Beyond 2014.'
                    });

                window.gapi.plusone.render(document.getElementById('googleButton'), {
                    onendinteraction: function(data) {
                        console.log(data);
                    },
                    href: 'http://perljedi.com'
                });
                window.FB.XFBML.parse();
                window.FB.Event.subscribe('xfbml.render', function() {
                    window.FB.Event.subscribe('edge.create', function() {
                        console.log('you love me, you really .. like me?');
                    });
                });

            }, 50);
        };


        $scope.$watch('searchTerm', function(search_string) {
            setTimeout(function() {
                if (search_string === $scope.searchTerm) {
                    $scope.searchTermWithDelay = search_string;
                    $scope.$apply();
                }
            }, 500);
        });

        $scope.viewTalkDetails = function(talk) {
            var path = '/talks/' + talk._id;
            $location.path(path);
        };

        window.twttr.ready(function(twttr) {
            twttr.events.bind('tweet', function() {
                console.log('ack, he tweeted');
            });
        });

        $scope.clearSearchFields = function(){
            $scope.searchTermWithDelay = '';
            $scope.searchTerm = '';
        };
    }
]);
