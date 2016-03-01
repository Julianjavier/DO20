do20.controller('apiDetails', ['$scope', '$rootScope','$http', '$location', '$routeParams','$firebaseAuth', '$location', function($scope, $rootScope, $http, $location, $routeParams, $firebaseAuth, $location){
	//will fire once the submit button from the form to determine wich api to call

	//These are the set up for the firebase connection
	var ref = new Firebase("https://do20.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);

	//This is a starting base variable for this search session
	var score = 20;
	$scope.stat = false;
	console.log('We got ', $scope.stat);

	//these values are for api selections
	var category = $routeParams.category
	var id = $routeParams.id
	console.log(category);
	console.log(id);

	if (category == 'restaurant' || category == 'establishment') {
		//this will call for the google places api, with already a filtered result.
		$http.get('../scripts/php/getLocationDetails.php?category='+ category +'&id='+ id )
	        .success(function(apiData){
	        	if (apiData !== null){
	        	console.log(apiData);
	        	$scope.task = apiData.name;
	        	$scope.itemId = apiData.place_id;
	        	$scope.placeData = apiData;
	        	$scope.status = apiData.opening_hours.open_now;
	        	$scope.latitude = apiData.geometry.location.lat;
	        	$scope.longitude = apiData.geometry.location.lng;
	        	$scope.stat = true;
	        	}else{
	        		console.log("we got nothing");
	        		$location.path('/')
	        	};
		    })
		    .error(function(apiData){
		        console.log('NONO ',apiData);
		    });

	}else if (category == 'cooking') {
		//This will get information from thr yummly api and will have a finite result.
		$http.get('../scripts/php/getYumDetails.php?id='+id)
			.success(function(apiData){
				if (apiData !== null){
				console.log(apiData);
				$scope.itemId = apiData[0].id;
				$scope.task = apiData[0].name;
				console.log($scope.task);
				$scope.foodData = apiData;
				$scope.img = $scope.foodData[0].images[0].hostedLargeUrl;
	        	$scope.stat = true;
				}else{
	        		console.log("we got nothing");
	        		$location.path('/')
	        	};
			})
			.error(function(apiData){
				console.log('NONO ',apiData);
			});
	};
}]);
