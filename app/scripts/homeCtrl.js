do20.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$http', function($scope, $rootScope, $location, $firebaseAuth, $http){

	$scope.submitForm = $scope.submit;

	$scope.category = [
	    { name: 'I feel like doing...', value: 'null' }, 
	    { name: 'I want to go out.', value: 'establishment' }, 
	    { name: 'I want to go Eat.', value: 'restaurant' },
	    { name: 'I want to cook.', value: 'cooking' },
	    { name: 'I want to see a movie.', value: 'movie' }
	];	

	$scope.submit = function(){
		var category = $scope.toDo.category;
		var query = $scope.toDo.keyword;
		$location.path('/dataResults/'+category+'/'+query);	  
	};


}]);