do20.controller('apiCtrl', ['$scope', '$http', function($scope, $http){
	// var goog = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=restaurant&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4';
	// var category = 'cooking';
	// var q = 'onion%20soup';
	$scope.submit = function(){
		if ($scope.toDo.category == 'restaurant' || $scope.toDo.category == 'entertainment') {
			$http.get('../scripts/getLocation.php?category='+ $scope.toDo.category +'&keyWord='+ $scope.toDo.keyword )
		        .success(function(data){
		        	console.log(data);
		        	var limit = data.results.length;
		        	var number = Math.floor((Math.random() * limit) + 1);
		        	$scope.data.results[number].name;
		        	$scope.data.results[number].place_id;
		        	$scope.data.results[number].rating;
		        	$scope.data.results[number].vicinity;	
		        	$location.path('/dataResults');	        	
		        })
		        .error(function(data){ 
		        	console.log('NONO ',data); 
		        });
	    }else if ($scope.toDo.category == 'cooking') {
			$http.get('../scripts/getYum.php?q='+ $scope.toDo.keyword)
				.success(function(data){
					var limit = data.matches.length;
		        	var number = Math.floor((Math.random() * limit) + 1);
		        	console.log('We got ', number);
		        	console.log(data);
		        	console.log(data.matches[imageUrlsBySize].90);
		        	console.log(data.matches[ingredients]);
		        	console.log(data.matches[rating]);
		        	console.log(data.matches[recipeName]);
		        	console.log(data.matches[sourceDisplayName]);
				})
				.error(function(data){
					console.log('NONO ',data);
				});
	    };
    };
}]);