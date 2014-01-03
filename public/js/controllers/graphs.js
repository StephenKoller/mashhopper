'use strict';

angular.module('mean.graphs').controller('GraphsController', ['$scope', '$routeParams', '$location', 'Global', 'Talks', 'User', 'MashhopperGraphs',
    function($scope, $routeParams, $location, Global, Talks, User, MashhopperGraphs) {

        $scope.chart = MashhopperGraphs.getChart();

        $scope.chartReady = function() {
            fixGoogleChartsBarsBootstrap();
        }

        function fixGoogleChartsBarsBootstrap() {
            // Google charts uses <img height="12px">, which is incompatible with Twitter
            // * bootstrap in responsive mode, which inserts a css rule for: img { height: auto; }.
            // *
            // * The fix is to use inline style width attributes, ie <img style="height: 12px;">.
            // * BUT we can't change the way Google Charts renders its bars. Nor can we change
            // * the Twitter bootstrap CSS and remain future proof.
            // *
            // * Instead, this function can be called after a Google charts render to "fix" the
            // * issue by setting the style attributes dynamically.

            $(".google-visualization-table-table img[width]").each(function(index, img) {
                $(img).css("width", $(img).attr("width")).css("height", $(img).attr("height"));
            });
        };


        $scope.global = Global;
    }
]);