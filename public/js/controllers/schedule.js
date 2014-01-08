'use strict';

angular.module('mean.schedule').controller('ScheduleController', ['$scope', '$routeParams', '$location', 'Global', 'Talks', 'User', function ($scope, $routeParams, $location, Global, Talks, User) {
    $scope.global = Global;
    $scope.colors =  { 
        '.NET' : 'dot-net',
        'Design/UX' : 'design',
        'Design (HTML, CSS, etc)' : 'design',
        'Cool Stuff' :'cool-stuff',
        'Testing' : 'testing',
        'Languages' : 'languages',
        'Java' : 'java',
        'Mobile' : 'mobile',
        'Mobile (Android, iOS, Windows Mobile, etc)' : 'mobile',
        'Ruby / Rails' : 'ruby',
        'JavaScript' : 'javascript',
        'Windows / .NET' : 'microsoft',
        'Hardware ( Raspberry Pi, Arduino, etc)' : 'hardware',
        'Development Methodologies' : 'methodologies',
        'Other' : 'other',
        'Soft Skills' : 'soft-skills',
        'Python' : 'python',
        'Cloud' : 'cloud',
        'Continuous Deployment' : 'deployment',
        'Mac/iPhone' : 'mac'
    };
    $scope.blocks = [];

    $scope.style = function(talk) {
        return $scope.colors[talk.Technology];
    };

    $scope.update = function(talk){
        var adding = !_.contains(user.talks, talk.Id);
        if(_.contains(user.talks, talk.Id))
            user.talks = _.without(user.talks, talk.Id);
        else
            user.talks.push(talk.Id);


        User.toggleAttending(adding, talk._id);
    };

    $scope.isAttending = function(talk) {
        var user = $scope.global.user;
        return _.contains(user.talks, talk.Id);
    };

    Talks.query(function(data) {
        $scope.talks = data;
        var timeslots = [];

        for (var i = data.length - 1; i >= 0; i--) {
            if (!_.contains(timeslots, data[i].Start)) {
                timeslots.push(data[i].Start);
            }
        };

        timeslots.sort();

        for (var i = 0; i < timeslots.length; i++) {
            $scope.blocks.push({time: timeslots[i], talks: []});
        };

        console.log($scope.blocks);

        for (var i = data.length - 1; i >= 0; i--) {
            var timeslot = _.find($scope.blocks, function(block) {return block.time == data[i].Start});
            timeslot.talks.push(data[i]);
        };
    });
}]);