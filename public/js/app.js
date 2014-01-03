'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.talks', 'mean.speakers', 'mean.schedule', 'codemash.talks', 'jquery.masonry', 'googlechart', 'mean.graphs', 'mashhopper.graphs']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.talks', []);
angular.module('mean.speakers', []);
angular.module('mean.schedule', []);
angular.module('mean.graphs', []);
angular.module('codemash.talks', []);
angular.module('jquery.masonry', []);
angular.module('googlechart', []);
angular.module('mashhopper.graphs', []);