var do20 = angular.module('do20', ["ngRoute"]);

do20.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'view/form.html',
		controller:'apiCtrl'
	}).when('/dataResults',{
		// templateUrl:'view/view.html',
		// controller:'apiCtrl'
	});
}]);