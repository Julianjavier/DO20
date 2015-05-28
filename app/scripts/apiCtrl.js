do20.controller('apiCtrl', ['$scope', '$rootScope','$http', '$location', '$routeParams','$firebaseAuth', '$location', '$window', function($scope, $rootScope, $http, $location, $routeParams, $firebaseAuth, $location, $window){
	//will fire once the submit button from the form to determine wich api to call
	
	//These are the set up for the firebase connection
	var ref = new Firebase("https://do20.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);

	//This is a starting base variable for this search session
	var score = 20;
	$scope.stat = false;
	console.log($rootScope.session);

	//these values are for api selections
	var category = $routeParams.category;
	var query = $routeParams.q;

	
	if (category == 'restaurant' || category == 'establishment') {
		scroll(0,0);
		if ($scope.lat == "" || $scope.lon == null) {
			//Thsi will hold the longitude and latitude for the location api
		    navigator.geolocation.getCurrentPosition(function(position) {
		  		var lat = position.coords.latitude;
		  		var lon = position.coords.longitude;

		  		//then run the get request for the api
		  		if (lat && lon) {
			  	//this will call for the google places api, with already a filtered result.
				$http.get('../scripts/getLocation.php?category='+ category +'&keyWord='+ query +"&lat="+ lat + "&lon="+ lon)
			        .success(function(apiData){
			        	if (apiData !== null){
			        	//this will segmante the data for easy call to the front end.
			        	$scope.task = apiData.name;
			        	$scope.itemId = apiData.place_id; 	        	
			        	$scope.placeData = apiData;
			        	//this mearly check for inconsistint data.
			        	if ($scope.placeData.rating){
			        		$scope.rating = $scope.placeData.rating;
			        	};
			        	if(apiData.opening_hours){
			        		$scope.status = apiData.opening_hours.open_now; 
			        	};
			        	//this sets variables for maps location.
			        	$scope.latitude = apiData.geometry.location.lat;
			        	$scope.longitude = apiData.geometry.location.lng;  
			        	//This will be used to allow original source viewing.
			        	$scope.originalSource = "https://www.google.com/maps/place/"+$scope.placeData.formatted_address;
			        	}else{
			        		console.log("we got nothing");
			        		$location.path('/')
			        	};	
				    })
				    .error(function(apiData){ 
				        console.log('NONO ',apiData); 
				    });	
				};    
			});	
		}else{
			$location.path('/');
		};
	
	}else if (category == 'cooking') {
		//This will get information from thr yummly api and will have a finite result.
		$http.get('../scripts/getYum.php?q='+ query)
			.success(function(apiData){
				//this sets datta for easy viewing on the front end.
				if (apiData !== null){
				console.log(apiData);
				$scope.itemId = apiData[0].id;
				$scope.task = apiData[0].name;
				console.log($scope.task);
				$scope.foodData = apiData;
				$scope.img = $scope.foodData[0].images[0].hostedLargeUrl;
				$scope.originalSource = $scope.foodData[0].source.sourceRecipeUrl;
				}else{
					//thsi sends user back to the front in case of bad request or servers are down.
	        		console.log("we got nothing");
	        		$location.path('/')
	        	};
			})
			.error(function(apiData){
				console.log('NONO ',apiData);
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

				$http({ method: 'POST', url: '../scripts/mongoTestConection.php?&firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&points='+score+'&provider='+authData.provider+'&category='+category+'&title='+$scope.task+'&id='+$scope.itemId
				}).success(function(data){
					$scope.stat = true;
					console.log(data);
				}).error(function(data){
					console.log()
				});	
			
			}else if (authData.provider = "google") {
				$http({ method: 'POST', url: '../scripts/mongoTestConection.php?&firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&points='+score+'&provider='+authData.provider+'&category='+category+'&title='+$scope.task+'&id='+$scope.itemId
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
		//this will execute the reroll functionality.
		if (category == 'restaurant' || category == 'establishment') {
			scroll(0,0);
			//Thsi will hold the longitude and latitude for the location api
		    navigator.geolocation.getCurrentPosition(function(position) {
		  		// do_something(position.coords.latitude, position.coords.longitude);
		  		var lat = position.coords.latitude;
		  		var lon = position.coords.longitude;

		  		if (lat && lon) {
			  	//this will call for the google places api, with already a filtered result.
				$http.get('../scripts/getLocation.php?category='+ category +'&keyWord='+ query +"&lat="+ lat + "&lon="+ lon)
			        .success(function(apiData){
			        	if (apiData !== null){
			        	console.log(apiData);
			        	$scope.task = apiData.name;
			        	$scope.itemId = apiData.place_id; 	        	
			        	$scope.placeData = apiData;
			        	if ($scope.placeData.rating){
			        		$scope.rating = $scope.placeData.rating;
			        	};
			        	if(apiData.opening_hours){
			        		$scope.status = apiData.opening_hours.open_now; 
			        	};
			        	$scope.latitude = apiData.geometry.location.lat;
			        	$scope.longitude = apiData.geometry.location.lng;  
			        	$scope.originalSource = "https://www.google.com/maps/place/"+$scope.placeData.formatted_address;
			        	}else{
			        		console.log("we got nothing");
			        		$location.path('/')
			        	};	
				    })
				    .error(function(apiData){ 
				        console.log('NONO ',apiData); 
				    });	
				};    
			});	
		
		}else if (category == 'cooking') {
			scroll(0,0);
			//This will get information from thr yummly api and will have a finite result.
			$http.get('../scripts/getYum.php?q='+ query)
				.success(function(apiData){
					console.log(apiData);
					$scope.foodData = apiData;
					$scope.img = $scope.foodData[0].images[0].hostedLargeUrl;
				})
				.error(function(apiData){
					console.log('NONO ',apiData);
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