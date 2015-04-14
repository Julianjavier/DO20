do20.controller("MyAuthCtrl", ["$scope", "$firebaseAuth", function($scope, $firebaseAuth) {
    var ref = new Firebase("https://do20.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData) {
	  if (authData) {
	    console.log("Logged in as:", authData.uid);
	  } else {
	    console.log("Logged out");
	  }
	});
  }
]);