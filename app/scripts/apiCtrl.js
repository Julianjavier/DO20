do20.controller('apiCtrl', ['$scope', '$rootScope','$http', '$location', '$routeParams','$firebaseAuth', '$location', '$window', "locationService", "foodService", function($scope, $rootScope, $http, $location, $routeParams, $firebaseAuth, $location, $window, locationService, foodService){
	//will fire once the submit button from the form to determine wich api to call

	//These are the set up for the firebase connection
	var ref = new Firebase("https://do20.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);

	//This is a starting base variable for this search session
	var score = 20;
	$scope.stat = false;
	$scope.callCompleat = true;
	console.log($rootScope.session);

	//these values are for api selections
	var category = $routeParams.category;
	var query = $routeParams.q;


	if (category == 'restaurant' || category == 'establishment') {

		scroll(0,0);
		if ($scope.lat == null || $scope.lon == null) {
			//Thsi will hold the longitude and latitude for the location api
		    navigator.geolocation.getCurrentPosition(function(position) {
		  		var lat = position.coords.latitude;
		  		var lon = position.coords.longitude;

					curLoc = new google.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        );

		  		//then run the get request for the api
		  		if (lat && lon) {
			  	//this will call for the google places api, with already a filtered result.
					locationService.getLocation(category, query, lat, lon).then(function(location) {
						console.log(location);
						$scope.placeData = location
						$scope.callCompleat = false;
					});
				};
			});
		}else{
			$location.path('/');
		};

	}else if (category == 'cooking') {
		//This will get information from thr yummly api and will have a finite result.
		foodService.getFood(query).then(function(dish) {
			console.log(dish);
			$scope.foodData = dish;
			$scope.callCompleat = false;
		});
	}else{
		$location.path('/')
	};

	$scope.confirm = function(){
		$window.open(encodeURI($scope.originalSource) , '_blank');
		console.log('confirm fired');

	    $scope.authObj.$onAuth(function(authData) {
		  if (authData) {
			console.log(authData);
			//this two if statments will check for either facebook or google auth.
			if (authData.provider = "facebook") {
				var facebookObject = authData.facebook.cachedUserProfile;

				$http({ method: 'POST', url: '../scripts/php/mongoTestConection.php?&firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&points='+score+'&provider='+authData.provider+'&category='+category+'&title='+$scope.placeData.name+'&id='+$scope.placeData.itemId
				}).success(function(data){
					$scope.stat = true;
					console.log(data);
				}).error(function(data){
					console.log()
				});

			}else if (authData.provider = "google") {
				$http({ method: 'POST', url: '../scripts/php/mongoTestConection.php?&firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&points='+score+'&provider='+authData.provider+'&category='+category+'&title='+$scope.placeData.name+'&id='+$scope.placeData.itemId
				}).success(function(data){
					$scope.stat = true;
					console.log(data);
				}).error(function(data){
					console.log()
				});
			};
		  	//
		  } else {
		    console.log("Logged out");
		  }
		});
	};

	$scope.reroll = function(){
		$scope.placeData = undefined;
		$scope.foodData = undefined;

		//this will execute the reroll functionality.
		$scope.callCompleat = true;
		if (category == 'restaurant' || category == 'establishment') {
			scroll(0,0);
			//Thsi will hold the longitude and latitude for the location api
		    navigator.geolocation.getCurrentPosition(function(position) {
		  		// do_something(position.coords.latitude, position.coords.longitude);
		  		var lat = position.coords.latitude;
		  		var lon = position.coords.longitude;

		  		if (lat && lon) {
					//this will call for the google places api, with already a filtered result.
					locationService.getLocation(category, query, lat, lon).then(function(location) {
						console.log(location);
						$scope.placeData = location
						$scope.callCompleat = false;
					});
				};
			});

		}else if (category == 'cooking') {
			scroll(0,0);
			//This will get information from thr yummly api and will have a finite result.
			foodService.getFood(query).then(function(dish) {
				console.log(dish);
				$scope.foodData = dish;
				$scope.callCompleat = false;
			});
		};

		if(score > 0){
			score = score - 2;
			if(score <= 0){
				score == 0;
			};

		}else{
			console.log('You are below 0');
			score = 0;
		};
	};


}]);
