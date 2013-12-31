'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.talks', 'mean.speakers']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.talks', []);
angular.module('mean.speakers', []);