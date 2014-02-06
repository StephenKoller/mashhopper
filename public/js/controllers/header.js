'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global',
	function($scope, Global) {
		$scope.global = Global;

		$scope.menu = [{
			'title': 'Schedule',
			'link': 'schedule'
		}, {
			'title': 'Talks',
			'link': 'talks'
		}, {
			'title': 'Speakers',
			'link': 'speakers'
		}, {
			'title': 'Graphs',
			'link': 'graphs'
		}];

		$scope.isCollapsed = false;
	}
]);