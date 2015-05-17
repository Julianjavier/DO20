var do20 = angular.module('do20', ["ngRoute", "firebase", "ngMap", "ui.bootstrap"]);

do20.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		
		templateUrl:'view/form.html',
		controller:'homeCtrl'
	
	}).when('/dataResults/:category/:q',{
		
		templateUrl:'view/view.html',
		controller:'apiCtrl'
	
	}).when('/mileList', {
		
		templateUrl:'view/mileList.html',
		controller:'listCtrl'		

	});
}]);