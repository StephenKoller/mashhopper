'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.talks').factory('Talks', ['$resource', function($resource) {
    return $resource('talks/:talkId', {
        talkId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);