'use strict';

angular.module('mashhopper.graphs').factory('MashhopperGraphs', function($http){
	return {
		getChart: function(){
		    var chart1 = {};
		    chart1.type = "PieChart";
		    chart1.displayed = false;
		    chart1.cssStyle = "height:600px; width:100%;";
		    chart1.data = $http.get('/graphs', { cache: true});

		 //    .then(function (response) {
			// 	// The then function here is an opportunity to modify the response
			// 	console.log(response);
			// 	// The return value gets picked up by the then in the controller.
			// 	console.log(response.data);
			// 	return response.data;
			// });
		    // chart1.data = {"cols": [
		    //     {id: "month", label: "Month", type: "string"},
		    //     {id: "laptop-id", label: "Laptop", type: "number"},
		    //     {id: "desktop-id", label: "Desktop", type: "number"},
		    //     {id: "server-id", label: "Server", type: "number"},
		    //     {id: "cost-id", label: "Shipping", type: "number"}
		    // ], "rows": [
		    //     {c: [
		    //         {v: "January"},
		    //         {v: 19, f: "42 items"},
		    //         {v: 12, f: "Ony 12 items"},
		    //         {v: 7, f: "7 servers"},
		    //         {v: 4}
		    //     ]},
		    //     {c: [
		    //         {v: "February"},
		    //         {v: 13},
		    //         {v: 1, f: "1 unit (Out of stock this month)"},
		    //         {v: 12},
		    //         {v: 2}
		    //     ]},
		    //     {c: [
		    //         {v: "March"},
		    //         {v: 24},
		    //         {v: 5},
		    //         {v: 11},
		    //         {v: 6}

		    //     ]}
		    // ]};

		    chart1.options = {
		        "title": "Sales per month",
		        "isStacked": "true",
		        "fill": 20,
		        "displayExactValues": true,
		        "vAxis": {
		            "title": "Sales unit", "gridlines": {"count": 10}
		        },
		        "hAxis": {
		            "title": "Date"
		        }
		    };

		    chart1.formatters = {};
		    return chart1;
		}
	};
});