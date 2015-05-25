do20.controller('apiCtrl', ['$scope', '$rootScope','$http', '$location', '$routeParams','$firebaseAuth', '$location', '$window', function($scope, $rootScope, $http, $location, $routeParams, $firebaseAuth, $location, $window){
	//will fire once the submit button from the form to determine wich api to call
	
	//These are the set up for the firebase connection
	var ref = new Firebase("https://do20.firebaseio.com");
	$scope.authObj = $firebaseAuth(ref);

	//This is a starting base variable for this search session
	var score = 20;
	$scope.stat = false;
	console.log('We got ', $scope.stat);

	//these values are for api selections
	var category = $routeParams.category;
	var query = $routeParams.q;
	console.log(category);
	console.log(query);

	//Thsi will hold the longitude and latitude for the location api
    navigator.geolocation.getCurrentPosition(function(position) {
  		// do_something(position.coords.latitude, position.coords.longitude);
  		$rootScope.lat = position.coords.latitude;
  		$rootScope.lon = position.coords.longitude;
  		console.log($rootScope.lat);
  		console.log($rootScope.lon);
	});	
	
	if (category == 'restaurant' || category == 'establishment') {
		if ($rootScope.lat == "" || $rootScope.lon == null) {
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
			        	$scope.status = apiData.opening_hours.open_now; 
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
		}else{
			$location.path('/');
		};
	
	}else if (category == 'cooking') {
		//This will get information from thr yummly api and will have a finite result.
		$http.get('../scripts/getYum.php?q='+ query)
			.success(function(apiData){
				if (apiData !== null){
				console.log(apiData);
				$scope.itemId = apiData[0].id;
				$scope.task = apiData[0].name;
				console.log($scope.task);
				$scope.foodData = apiData;
				$scope.img = $scope.foodData[0].images[0].hostedLargeUrl;
				$scope.originalSource = $scope.foodData[0].source.sourceRecipeUrl;
				}else{
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
		console.log($scope.originalSource);
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
		if (category == 'restaurant' || category == 'establishment') {
			//this will call for the google places api, with already a filtered result.
			$http.get('../scripts/getLocation.php?category='+ category +'&keyWord='+ query)
		        .success(function(apiData){
		        	console.log(apiData);
		        	$scope.placeData = apiData; 
		        	$scope.latitude = apiData.geometry.location.lat;
		        	$scope.longitude = apiData.geometry.location.lng;
		        	console.log($scope.latitude); 
		        	console.log($scope.longitude);    	
			    })
			    .error(function(apiData){ 
			        console.log('NONO ',apiData); 
			    });
		
		}else if (category == 'cooking') {
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