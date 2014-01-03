'use strict';

angular.module('mashhopper.graphs').factory('MashhopperGraphs', function($http){
	return {
		getChart: function(){
		    var chart1 = {};
		    chart1.type = "PieChart";
		    chart1.displayed = false;
		    chart1.cssStyle = "height:600px; width:100%;";
		    chart1.data = $http.get('/graphs', { cache: true});
		    chart1.options = {
		        "title": "........what we be learning",
		        "isStacked": "true",
		        "fill": 20,
		        "displayExactValues": true,
		        "vAxis": {
		            "title": "Technology", "gridlines": {"count": 10}
		        },
		        "hAxis": {
		            "title": "Sessions Attending"
		        }
		    };

		    chart1.formatters = {};
		    return chart1;
		}
	};
});