do20.controller('homeCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
	var ref = new Firebase("https://do20.firebaseio.com");

	$scope.submit = function(){
		var category = $scope.toDo.category;
		var query = $scope.toDo.keyword;
		$location.path('/dataResults/'+category+'/'+query);	  
	};

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