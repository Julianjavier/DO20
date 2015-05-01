do20.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$http', function($scope, $rootScope, $location, $firebaseAuth, $http){

	$scope.submit = function(){
		var category = $scope.toDo.category;
		var query = $scope.toDo.keyword;
		$location.path('/dataResults/'+category+'/'+query);	  
	};

}]);