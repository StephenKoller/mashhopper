'use strict';

angular.module('mashhopper.leaderboard').controller('LeaderboardController', ['$scope', 'Global',
    function($scope, Global) {
        $scope.global = Global;
        $scope.socket = io.connect('http://localhost:3000');
        $scope.events = [];

        $scope.types = [
            'signup',
            'attend',
            'like',
            'tweet',
            'facebook',
            'linkedIn',
            'gplus',
            'note',
            'reminder',
            'booth:',
            'contactMe',
            'question',
            'answer'
        ];

        $scope.users = [
            'Ben',
            'Steve',
            'Eric',
            'Dan',
            'Dave'
        ];

        $scope.sessions = [
            'Javascript Rocks',
            'Learn about JS',
            'Eloquent JS',
            'Angular and beyond',
            'Who cares about Backbone?',
            'Why Angular is for every project'
        ];

        $scope.socket.on('event', function (event) {
            console.log('got an emit');
            console.log(event);

            $scope.$apply(function() {
                //console.log('message contains:', event.message);
                $scope.events.push(event);
            });
        });

        $scope.sendEvent = function() {
            $scope.socket.emit('doEvent', {
                event: {
                    username: 'Ben',
                    type: 'tweet',
                    session: 'Javascript Rocks',
                    xp: 6
                },
                user: {}
            });
        };

        $scope.populateMockEvents = function() {
            for (var i = 0; i < 10; i++) {
                $scope.createEvent();
            }
        };

        $scope.createEvent = function() {
            $scope.socket.emit('doEvent', {
                event: {
                    username: $scope.getRandomUser(),
                    type: $scope.getRandomType(),
                    session: $scope.getRandomSession()
                },
                user: {
                    save: function() {}
                }
            });
        };

        $scope.getRandomUser = function() {
            var index = Math.floor(Math.random() * $scope.users.length);
            return $scope.users[index];
        };

        $scope.getRandomType = function() {
            var index = Math.floor(Math.random() * $scope.types.length);
            return $scope.types[index];
        };

        $scope.getRandomSession = function() {
            var index = Math.floor(Math.random() * $scope.sessions.length);
            return $scope.sessions[index];
        };
    }
]);