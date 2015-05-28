var do20 = angular.module('do20', ["ngRoute", "ngTouch", "ngStorage", "firebase", "ngMap", "ui.bootstrap"]);

do20.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		
		templateUrl:'view/form.html',
		controller:'homeCtrl'
	
	}).when('/dataResults/:category/:q',{
		
		templateUrl:'view/view.html',
		controller:'apiCtrl'
	
	}).when('/userProfile', {
		
		templateUrl:'view/mileList.html',
		controller:'listCtrl'		

	}).when('/history', {
		
		templateUrl:'view/history.html',
		controller:'historyCtrl'		

	}).when('/details/:category/:id',{
		
		templateUrl:'view/view.html',
		controller:'apiDetails'
	
	});
}]);