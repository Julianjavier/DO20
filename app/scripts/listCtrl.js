do20.controller('listCtrl', ["$scope", "$firebaseAuth", "$rootScope", "$modal", "$http",  "$location",  function($scope, $firebaseAuth, $rootScope, $modal, $http, $location){
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.category = [
	    { name: 'Now choose...', value: 'null' }, 
	    { name: 'Something new to do.', value: 'establishment' }, 
	    { name: 'Somewhere new to eat.', value: 'restaurant' },
	    { name: 'Something new to cook.', value: 'cooking' },
	];

	$scope.defaultVar = $scope.category[0];	

    $scope.authObj.$onAuth(function(authData) {
	  if(authData){
	  	//This will provide the data form the specified login provider.
	  	$rootScope.AuthData = authData;
	  	console.log($rootScope.AuthData);

    	if(authData.provider == "facebook"){
	    	//This will check user information on our mongo database.
	    	var facebookObject = authData.facebook.cachedUserProfile;
		    $scope.userName = facebookObject.first_name;
			$scope.lastName = facebookObject.last_name;
			$scope.provider = authData.provider;	    	

	    	$http.get('../scripts/getMileList.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	$scope.list = mongoData.list;
	        	$scope.userHistory = mongoData["history"];	        	
	        	console.log(mongoData);
	        	console.log($scope.list);
	        	console.log($scope.userHistory);
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ', mongoData); 
		    });	
		    //end mongo call.
    	}else if(authData.provider == "google"){
	    	//This will check user information on our mongo database.
	    	var googleObject = authData.google.cachedUserProfile;	    	
		    $scope.userName = googleObject.given_name;
			$scope.lastName = googleObject.family_name;
			$scope.provider = authData.provider;

		    $http.get('../scripts/getMileList.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	$scope.list = mongoData.list;
	        	$scope.userHistory = mongoData.history;
	        	console.log(mongoData);
	        	console.log($scope.list);
	        	console.log($scope.userHistory);
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ', mongoData); 
		    });		
		    //end mongo call.
    	};	

		$scope.listItemSubmit = function () {
			console.log("list submit fire");
		    var category = $scope.defaultVar.value;
			var title = $scope.defaultVar.name;		    
			var task = $scope.toDo.task;
			if (category !== null && task !== null) {
				$http.get('../scripts/mongoMileList.php?firstName='+$scope.userName+'&lastName='+$scope.lastName+'&provider='+$scope.provider+'&category='+category+'&task='+task+'&title='+title)
			        .success(function(mongoData){
						$http.get('../scripts/getMileList.php?firstName='+$scope.userName+'&lastName='+$scope.lastName+'&provider='+$scope.provider)
				        .success(function(mongoData){
				        	$scope.list = mongoData.list;
				        	console.log($scope.list);
					    })
					    .error(function(mongoData){ 
					        console.log('NOPE ', mongoData); 
					    });					        	
				    })
				    .error(function(mongoData){ 
				        console.log('NONO ',mongoData); 
				    });
			};    			
	   	} 	   	    
	 
	  } else {
	  	$rootScope.AuthData = authData;
		$scope.userName = null;
		$scope.lastName = null;
		$scope.provider = null;	    
	    console.log("Logged out", authData);
	  }
	});
}]);

