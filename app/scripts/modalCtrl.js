do20.controller("ModalInstanceCtrl", ["$scope", "$rootScope", "$modal", "$firebaseAuth", "$modalInstance", "$localStorage", function($scope, $rootScope, $modal, $firebaseAuth, $modalInstance, $localStorage){
  var ref = new Firebase("https://do20.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.facebookLogin = function(){
    $localStorage.session = true;  
    $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
      $modalInstance.dismiss('cancel'); 
    }).catch(function(error) {
      $localStorage.session = false;
    });
  };

  $scope.googleLogin = function(){
    $localStorage.session = true;      
    $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
      $modalInstance.dismiss('cancel');
    }).catch(function(error) {
      $localStorage.session = false;
    }); 
  };

}]);