do20.controller('homeCtrl', ['$scope', '$rootScope', '$location', '$firebaseAuth', function($scope, $rootScope, $location, $firebaseAuth){
	var ref = new Firebase("https://do20.firebaseio.com");

	$scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	    console.log("Logged in as:", authData);
	  } else {
	    console.log("Logged out");
	  }
	});

	$scope.submit = function(){
		var category = $scope.toDo.category;
		var query = $scope.toDo.keyword;
		$location.path('/dataResults/'+category+'/'+query);	  
	};

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


}]);