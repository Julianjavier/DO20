do20.controller("MyAuthCtrl", ["$scope", "$firebaseAuth", "$rootScope", function($scope, $firebaseAuth, $rootScope) {
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	  	$rootScope.AuthData = authData;
	    console.log("Logged in as:", authData.uid);
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