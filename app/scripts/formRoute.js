do20.controller('formRoute', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
	$scope.submit = function(){
		var category = $scope.toDo.category;
		var query = $scope.toDo.keyword;
		$location.path('/dataResults/'+category+'/'+query);	  
	};
}]);