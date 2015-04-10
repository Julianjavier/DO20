do20.controller('apiCtrl', ['$scope', '$rootScope','$http', '$location', function($scope, $rootScope, $http, $location){
	//will fire once the submit button from the form to determine wich api to call
	$scope.submit = function(){
		if ($scope.toDo.category == 'restaurant' || $scope.toDo.category == 'entertainment') {
			//this will call for the google places api, with already a filtered result.
			$http.get('../scripts/getLocation.php?category='+ $scope.toDo.category +'&keyWord='+ $scope.toDo.keyword )
		        .success(function(apiData){
		        	console.log(apiData);
		        	var limit = apiData.results.length;
		        	var number = Math.floor(Math.random() * limit);
		        	// console.log('MAX IS', limit);
		        	// console.log('We got ', number);
		        	// console.log('Witch is', apiData.results[number].name);
		        	// console.log('Witch is', apiData.results[number].place_id);
		        	// console.log('Witch is', apiData.results[number].rating);
		        	// console.log('Witch is', apiData.results[number].vicinity);
		        	$scope.data = apiData.results[number];
		        	$location.path('/dataResults');	        	
		        })
		        .error(function(apiData){ 
		        	console.log('NONO ',apiData); 
		        });
	    }else if ($scope.toDo.category == 'cooking') {
			//This will get information from thr yummly api and will have a finite result.
			$http.get('../scripts/getYum.php?q='+ $scope.toDo.keyword)
				.success(function(apiData){
					var limit = apiData.matches.length;
		        	var number = Math.floor(Math.random() * limit);
		        	console.log('We got ', number);
		        	console.log(apiData);
		        	// console.log(apiData.matches[imageUrlsBySize].smallImageUrls);
		        	// console.log(apiData.matches[ingredients]);
		        	// console.log(apiData.matches[rating]);
		        	// console.log(apiData.matches[recipeName]);
		        	// console.log(apiData.matches[sourceDisplayName]);
				})
				.error(function(apiData){
					console.log('NONO ',apiData);
				});
	    };
    };
}]);