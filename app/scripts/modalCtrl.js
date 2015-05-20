do20.controller("ModalInstanceCtrl", ["$scope", "$modal", "$firebaseAuth", "$modalInstance",  function($scope, $modal, $firebaseAuth, $modalInstance){
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
    $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $modalInstance.dismiss('cancel');    
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.googleLogin = function(){
    console.log("we fired google!");
    $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $modalInstance.dismiss('cancel');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    }); 
  };

}]);