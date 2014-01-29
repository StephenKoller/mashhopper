'use strict';

angular.module('mashhopper.chat').controller('ChatController', ['$scope',
    function($scope) {
        $scope.getMessages = function() {
            return $scope.messages.join('\n');
        };
     
        $scope.sendMessage = function(message) {
            console.log('trying to send message:', message);
            $scope.socket.emit('send', { message: message });
        };

        $scope.connect = function() {
            $scope.socket = io.connect('http://localhost:3000');

            $scope.socket.on('message', function (data) {
                console.log('got an emit');
                if(data.message) {
                    $scope.$apply(function() {
                        console.log('message contains:', data.message);
                        $scope.messages.push(data.message);
                    });
                } else {
                    console.log('There is a problem:', data);
                }
            });
        };

        $scope.messages = [];
     
        
    }
]);