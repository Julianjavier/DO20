var do20 = angular.module('do20', ["ngRoute"]);

do20.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl:'view/form.html',
		controller:'formRoute'
	}).when('/dataResults/:category/:q',{
		templateUrl:'view/view.html',
		controller:'apiCtrl'
	});
}]);