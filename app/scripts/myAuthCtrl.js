do20.controller("myAuthCtrl", ["$scope", "$rootScope", "$firebaseAuth", "$modal", "$http",  function($scope, $rootScope, $firebaseAuth, $modal, $http, $modalInstance){
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);
     // $rootScope.session == true;  

    $scope.authObj.$onAuth(function(authData) {
	  if(authData){
	  	//This will provide the data form the specified login provider.
	  	$rootScope.AuthData = authData;
	  	console.log($rootScope.AuthData);
    	
    	if(authData.provider == "facebook"){
	    	//This will check user information on our mongo database.
	    	var facebookObject = authData.facebook.cachedUserProfile;
	    	$http.get('../scripts/getUserData.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	console.log(mongoData);
	        	$scope.ID = authData.uid;
	        	
	        	$scope.firstName = mongoData.firstName;
	        	$scope.lastName = mongoData.lastName;
	        	$scope.score = mongoData.score;
	        	$scope.tasks = mongoData.tasks;
     	
	        	$scope.img = facebookObject.picture.data.url;

	        	// && $rootScope.session == true
	        	if($scope.tasks >= 20) {
	        		console.log($rootScope.session);
	        		console.log("SUDO SESSION HAS BEEN CONFIRMED");
		
					var modalInstance = $modal.open({
					    animation: true,
					    templateUrl: 'view/mileEvent.html',
					    controller: 'MileListEvnet'
					});	        		

	        	};
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ',mongoData); 
		    });	
		    //end mongo call.
    	}else if(authData.provider == "google"){
	    	//This will check user information on our mongo database.
	    	var googleObject = authData.google.cachedUserProfile;
	    	$http.get('../scripts/getUserData.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
	        .success(function(mongoData){
	        	console.log(mongoData);
	        	
	        	$scope.firstName = mongoData.firstName;
	        	$scope.lastName = mongoData.lastName;
	        	$scope.score = mongoData.score;
	        	$scope.tasks = mongoData.tasks;
	  
	        	$scope.img = googleObject.picture;	
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ',mongoData); 
		    });	
		    //end mongo call.
    	};	    
	 
	  } else {
	  	$rootScope.AuthData = authData;
	    console.log("Logged out", authData);
	    // $rootScope.session === false;
	  }
	});

	//This will hold the instance for the login modal window.
	$scope.openForm = function () {
		console.log("Open Fire")
		// $rootScope.session == false;
		console.log($rootScope.session);
		var modalInstance = $modal.open({
		    animation: true,
		    templateUrl: 'view/loginModle.html',
		    controller: 'ModalInstanceCtrl'
		});
   	}
}]);

