var do20 = angular.module('do20', ["ngRoute", "firebase", "ngMap"]);

do20.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		
		templateUrl:'view/form.html',
		controller:'homeCtrl'
	
	}).when('/dataResults/:category/:q',{
		
		templateUrl:'view/view.html',
		controller:'apiCtrl'
	
	}).when('/login',{
		
		templateUrl:'view/loginModle.html',
		controller:'homeCtrl'

	});
}]);