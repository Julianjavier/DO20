var do20 = angular.module('do20', ["ngRoute"]);

do20.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'view/view.html',
		controller:'GoogleLocation'
	});
}]);