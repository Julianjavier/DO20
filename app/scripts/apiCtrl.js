do20.controller('apiCtrl', ['$scope', '$rootScope','$http', '$location', '$routeParams', function($scope, $rootScope, $http, $location, $routeParams){
	//will fire once the submit button from the form to determine wich api to call
		var category = $routeParams.category
		var query = $routeParams.q
		console.log(category);
		console.log(query);
		if (category == 'restaurant' || category == 'entertainment') {
			//this will call for the google places api, with already a filtered result.
			$http.get('../scripts/getLocation.php?category='+ category +'&keyWord='+ query )
		        .success(function(apiData){
		        	console.log(apiData);
		        	var limit = apiData.results.length;
		        	var number = Math.floor(Math.random() * limit);
		        	console.log('MAX IS', limit);
		        	// console.log('We got ', number);
		        	// console.log('Witch is', apiData.results[number].name);
		        	// console.log('Witch is', apiData.results[number].place_id);
		        	// console.log('Witch is', apiData.results[number].rating);
		        	// console.log('Witch is', apiData.results[number].vicinity);
		        	$scope.placeData = apiData.results[number];       	
		        })
		        .error(function(apiData){ 
		        	console.log('NONO ',apiData); 
		        });
	    }else if (category == 'cooking') {
			//This will get information from thr yummly api and will have a finite result.
			$http.get('../scripts/getYum.php?q='+ query)
				.success(function(apiData){
					var limit = apiData.matches.length;
		        	var number = Math.floor(Math.random() * limit);
		        	console.log('We got ', number);
		        	console.log(apiData.matches[number].imageUrlsBySize[90]);
		        	$scope.foodData = apiData.matches[number]; 
				})
				.error(function(apiData){
					console.log('NONO ',apiData);
				});
	    };
}]);