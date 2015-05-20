do20.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$http', function($scope, $rootScope, $location, $firebaseAuth, $http){

	$scope.submitForm = $scope.submit;

	$scope.category = [
	    { name: 'I feel like doing...', value: 'null' }, 
	    { name: 'I want to go out.', value: 'establishment' }, 
	    { name: 'I want to go Eat.', value: 'restaurant' },
	    { name: 'I want to cook.', value: 'cooking' }
	    // { name: 'I want to see a movie.', value: 'movie' }
	];

	$scope.defaultVar = $scope.category[0];	

	$scope.submit = function(){
		var category = $scope.defaultVar.value;
		var query = $scope.toDo.keyword;
		console.log('We fired');
		$location.path('/dataResults/'+category+'/'+query);	  
	};


}]);