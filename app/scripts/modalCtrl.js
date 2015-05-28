do20.controller("ModalInstanceCtrl", ["$scope", "$rootScope", "$modal", "$firebaseAuth", "$modalInstance", "$localStorage", function($scope, $rootScope, $modal, $firebaseAuth, $modalInstance, $localStorage){
  var ref = new Firebase("https://do20.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);

  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.item);
  // };

  $scope.cancel = function () {
    console.log($modalInstance);
    $modalInstance.dismiss('cancel');
  };

  $scope.facebookLogin = function(){
    console.log("we fired facebook!"); 
    $localStorage.session = true;  
    $scope.authObj.$authWithOAuthRedirect("facebook").then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $modalInstance.dismiss('cancel'); 
    }).catch(function(error) {
      $localStorage.session = false;
      console.error("Authentication failed:", error);
    });
  };

  $scope.googleLogin = function(){
    console.log("we fired google!");
    $localStorage.session = true;      
    $scope.authObj.$authWithOAuthRedirect("google").then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $modalInstance.dismiss('cancel');
    }).catch(function(error) {
      $localStorage.session = false;
      console.error("Authentication failed:", error);
    }); 
  };

}]);