'use strict';

angular.module('mashhopper.graphs').factory('MashhopperGraphs', function($http){
	return {
		getChart: function(){
		    var chart1 = {};
		    chart1.type = "PieChart";
		    chart1.displayed = false;
		    chart1.cssStyle = "height:600px; width:100%;";
		    chart1.data = $http.get('/graphs', { cache: true}).then(function (value) { 
                console.log(value);
                chart1.data = value.data; 
            });
            chart1.formatters = {};
            return chart1;
		}
	};
});