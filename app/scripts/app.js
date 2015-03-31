var do20 = angular.module('timeSyncApp', ["ngRoute"]);

do20.config(['$routeProvide', function($routeProvide){}
	$routeProvide.when('/', {
		templateUrl:'view/view.html',
		controller:'GoogleLocation'
	})
}]);