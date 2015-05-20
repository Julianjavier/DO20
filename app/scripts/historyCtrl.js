do20.controller('historyCtrl', ["$scope", "$firebaseAuth", "$rootScope", "$modal", "$http",  "$location",  function($scope, $firebaseAuth, $rootScope, $modal, $http, $location){
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

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

	    	$http.get('../scripts/getSavedList.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
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
		    $scope.userName = googleObject.given_name;
			$scope.lastName = googleObject.family_name;
			$scope.provider = authData.provider;

		    $http.get('../scripts/getSavedList.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	$scope.list = mongoData.list;
	        	console.log($scope.list);
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ', mongoData); 
		    });		
		    //end mongo call.
    	};	

		$scope.getDetails = function (id, category) {
			console.log("list submit fire");
			console.log(id);
			console.log(category);
			if (category !== null && id !== null) {
				$location.path('/details/'+category+'/'+id);	  
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

