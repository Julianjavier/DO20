do20.controller('auth', ['$scope', '$rootScope', function($scope, $rootScope){
	var ref = new Firebase("https://do20.firebaseio.com");

	$scope.facebookLogin = function(){
		console.log("we fired facebook!");
		ref.authWithOAuthPopup("facebook", function(error, authData){
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});
	};

	$scope.googleLogin = function(){
		console.log("we fired google!");
		ref.authWithOAuthPopup("google", function(error, authData){
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});		
	};
}]);