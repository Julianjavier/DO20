do20.controller('listCtrl', ["$scope", "$firebaseAuth", "$rootScope", "$modal", "$http",  function($scope, $firebaseAuth, $rootScope, $modal, $http){
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.category = [
	    { name: 'I feel like doing...', value: 'null' }, 
	    { name: 'I want to go out.', value: 'establishment' }, 
	    { name: 'I want to go Eat.', value: 'restaurant' },
	    { name: 'I want to cook.', value: 'cooking' },
	    { name: 'I want to see a movie.', value: 'movie' }
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
	    	$http.get('../scripts/getMileList.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	$scope.list = mongoData.list;
	        	console.log($scope.list);
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ', mongoData); 
		    });	
		    //end mongo call.
    	}else if(authData.provider == "google"){
	    	//This will check user information on our mongo database.
	    	var googleObject = authData.google.cachedUserProfile;	    	
		    $http.get('../scripts/getMileList.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	$scope.list = mongoData.list;
	        	console.log($scope.list);
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ', mongoData); 
		    });		
		    //end mongo call.
    	};	

		$scope.listItemSubmit = function () {
			console.log("list submit fire");
		    var category = $scope.defaultVar.value;
			var task = $scope.toDo.task;
			
			$http.get('../scripts/mongoMileList.php?firstName=Julian&lastName=Rodriguez&provider=facebook&category='+category+'&task='+task)
		        .success(function(mongoData){

			    })
			    .error(function(mongoData){ 
			        console.log('NONO ',mongoData); 
			    });			
	   	}    
	 
	  } else {
	  	$rootScope.AuthData = authData;
	    console.log("Logged out", authData);
	  }
	});
}]);

