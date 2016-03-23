do20.controller("myAuthCtrl", ["$scope", "$rootScope", "$firebaseAuth", "$localStorage", "$modal", "$http",  function($scope, $rootScope, $firebaseAuth, $localStorage, $modal, $http, $modalInstance){
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData) {
	  if(authData){
	  	//This will provide the data form the specified login provider.
	  	$rootScope.AuthData = authData;

    	if(authData.provider == "facebook"){
	    	//This will check user information on our mongo database.
	    	var facebookObject = authData.facebook.cachedUserProfile;
	    	$http.get('../scripts/php/getUserData.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
	        .success(function(mongoData){
            console.log(mongoData);
	        	$scope.ID = authData.uid;

	        	//This will set the basic variables to be used by the front end.
	        	$scope.firstName = mongoData.firstName;
	        	$scope.lastName = mongoData.lastName;
	        	$scope.score = mongoData.score;
	        	$scope.tasks = mongoData.tasks;
	        	$scope.list = mongoData.mileList;

	        	$scope.img = facebookObject.picture.data.url;

	        	// thsi fires the mile stone event ir parameters are met
	        	// if($scope.tasks >= 20 && $scope.list.length > 0 && $localStorage.session == true) {
    				// 	var modalInstance = $modal.open({
    				// 	    animation: true,
    				// 	    templateUrl: 'view/mileEvent.html',
    				// 	    controller: 'MileListEvnet'
    				// 	});
	        	// };
		    })
		    .error(function(mongoData){
		    });
		    //end mongo call.
    	}else if(authData.provider == "google"){
	    	//This will check user information on our mongo database.
	    	var googleObject = authData.google.cachedUserProfile;
	    	$http.get('../scripts/php/getUserData.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
	        .success(function(mongoData){

	        	//This will set the basic variables to be used by the front end.
	        	$scope.firstName = mongoData.firstName;
	        	$scope.lastName = mongoData.lastName;
	        	$scope.score = mongoData.score;
	        	$scope.tasks = mongoData.tasks;

	        	$scope.img = googleObject.picture;
		    })
		    .error(function(mongoData){
		    });
		    //end mongo call.
    	};

	  } else {
	  	//thsi will set sudo session
	  	$rootScope.AuthData = authData;
	  }
	});

	//This will hold the instance for the login modal window.
	$scope.openForm = function () {
  	var modalInstance = $modal.open({
  	    animation: true,
  	    templateUrl: 'view/loginModle.html',
  	    controller: 'ModalInstanceCtrl'
  	});
  }
}]);
