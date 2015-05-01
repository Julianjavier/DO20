do20.controller("MyAuthCtrl", ["$scope", "$firebaseAuth", "$rootScope", "$http", function($scope, $firebaseAuth, $rootScope, $http) {
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData) {
	  if(authData){
	  	$rootScope.AuthData = authData;
    	
    	if(authData.provider == "facebook"){
	    	//This will check user information on our mongo database.
	    	var facebookObject = authData.facebook.cachedUserProfile;
	    	$http.get('../scripts/getUserData.php?id='+authData.uid+'&firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name)
	        .success(function(mongoData){
	        	console.log(mongoData);
	        	$scope.ID = authData.uid;	
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ',mongoData); 
		    });	
		    //end mongo call.
    	}else if(authData.provider == "google"){
	    	//This will check user information on our mongo database.
	    	var facebookObject = authData.google.cachedUserProfile;
	    	$http.get('../scripts/getUserData.php?id='+authData.uid+'&firstName='+googleObject.given_name+'&lastName='+googleObject.family_name)
	        .success(function(mongoData){
	        	console.log(mongoData);	
		    })
		    .error(function(mongoData){ 
		        console.log('NOPE ',mongoData); 
		    });	
		    //end mongo call.
    	};	    
	 
	  } else {
	  	$rootScope.AuthData = authData;
	    console.log("Logged out", authData);
	  }
	});
	
	$scope.facebookLogin = function(){
		console.log("we fired facebook!");
		$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	};

	$scope.googleLogin = function(){
		console.log("we fired google!");
		$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});	
	};

  }
]);