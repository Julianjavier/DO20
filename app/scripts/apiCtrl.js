do20.controller('apiCtrl', ['$scope', '$rootScope','$http', '$location', '$routeParams','$firebaseAuth', function($scope, $rootScope, $http, $location, $routeParams, $firebaseAuth){
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
	var query = $routeParams.q
	console.log(category);
	console.log(query);
	
	if (category == 'restaurant' || category == 'establishment') {
		//this will call for the google places api, with already a filtered result.
		$http.get('../scripts/getLocation.php?category='+ category +'&keyWord='+ query )
	        .success(function(apiData){
	        	console.log(apiData);
	        	$scope.placeData = apiData;
	        	$scope.status = apiData.opening_hours.open_now; 
	        	$scope.latitude = apiData.geometry.location.lat;
	        	$scope.longitude = apiData.geometry.location.lng;  	
		    })
		    .error(function(apiData){ 
		        console.log('NONO ',apiData); 
		    });
	
	}else if (category == 'cooking') {
		//This will get information from thr yummly api and will have a finite result.
		$http.get('../scripts/getYum.php?q='+ query)
			.success(function(apiData){
				console.log(apiData);
				$scope.foodData = apiData
			})
			.error(function(apiData){
				console.log('NONO ',apiData);
			});
	};

	$scope.confirm = function(){
		console.log('confirm fired');

	    $scope.authObj.$onAuth(function(authData) {
		  if (authData) {
			$http({ method: 'POST', url: '../scripts/mongoTestConection.php?id='+authData.uid+'&points='+score
			}).success(function(data){
				$scope.stat = true;
				console.log('We got ', $scope.stat);
			}).error(function(data){
				console.log()
			});		  	
		  
		  } else {
		    console.log("Logged out");
		  }
		});
	};

	$scope.reroll = function(){
		if (category == 'restaurant' || category == 'entertainment') {
			//this will call for the google places api, with already a filtered result.
			$http.get('../scripts/getLocation.php?category='+ category +'&keyWord='+ query )
		        .success(function(apiData){
		        	console.log(apiData);
		        	$scope.placeData = apiData; 
		        	$scope.latitude = apiData[0].geometry.location.lat;
		        	$scope.latitude = apiData[0].geometry.location.lng;     	
			    })
			    .error(function(apiData){ 
			        console.log('NONO ',apiData); 
			    });
		
		}else if (category == 'cooking') {
			//This will get information from thr yummly api and will have a finite result.
			$http.get('../scripts/getYum.php?q='+ query)
				.success(function(apiData){
					console.log(apiData);
					$scope.foodData = apiData
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