do20.controller('listCtrl', ["$scope", "$firebaseAuth", "$rootScope", "$modal", "$http",  "$location",  "$route", function($scope, $firebaseAuth, $rootScope, $modal, $http, $location, $route){
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.category = [
	    { name: 'Now choose...', value: 'null' }, 
	    { name: 'Something new to do', value: 'establishment' }, 
	    { name: 'Somewhere new to eat', value: 'restaurant' },
	    { name: 'Something new to cook', value: 'cooking' },
	];

	$scope.defaultVar = $scope.category[0];	

    $scope.authObj.$onAuth(function(authData) {
	  if(authData){
	  	//This will provide the data form the specified login provider.
	  	$rootScope.AuthData = authData;

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
		    })
		    .error(function(mongoData){ 
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
		    })
		    .error(function(mongoData){ 
		    });		
		    //end mongo call.
    	};	

		$scope.listItemSubmit = function () {
		    var category = $scope.defaultVar.value;
			var title = $scope.defaultVar.name;		    
			var task = $scope.toDo.task;
			if (category !== null && task !== null) {
				$http.get('../scripts/mongoMileList.php?firstName='+$scope.userName+'&lastName='+$scope.lastName+'&provider='+$scope.provider+'&category='+category+'&task='+task+'&title='+title)
			        .success(function(mongoData){
						$http.get('../scripts/getMileList.php?firstName='+$scope.userName+'&lastName='+$scope.lastName+'&provider='+$scope.provider)
				        .success(function(mongoData){
				        	$scope.list = mongoData.list;
				        	$route.reload();
					    })
					    .error(function(mongoData){ 
					    });					        	
				    })
				    .error(function(mongoData){ 
				    });
			};    			
	   	} 	   	    
	 
	  } else {
	  	$rootScope.AuthData = authData;
		$scope.userName = null;
		$scope.lastName = null;
		$scope.provider = null;	    
	  }
	});
}]);

