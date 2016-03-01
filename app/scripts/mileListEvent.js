do20.controller("MileListEvnet", ["$scope", "$rootScope", "$modal", "$firebaseAuth", "$modalInstance", "$http", '$location', "$localStorage", function($scope, $rootScope, $modal, $firebaseAuth, $modalInstance, $http, $location, $localStorage){
  var ref = new Firebase("https://do20.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);


    $scope.authObj.$onAuth(function(authData) {
    if(authData){
      //This will provide the data form the specified login provider.
      $rootScope.AuthData = authData;

      if(authData.provider == "facebook"){
        //This will check user information on our mongo database.
        var facebookObject = authData.facebook.cachedUserProfile;
        $http.get('../scripts/php/getMileList.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
          .success(function(mongoData){

            $scope.firstName = facebookObject.first_name;
            $scope.mileList = mongoData.list;

            $scope.randResult = $scope.mileList[Math.floor(Math.random() * $scope.mileList.length)];
        })
        .error(function(mongoData){
        });
        //end mongo call.
      }else if(authData.provider == "google"){
        //This will check user information on our mongo database.
        var googleObject = authData.google.cachedUserProfile;
        $http.get('../scripts/php/getMileList.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
          .success(function(mongoData){

            $scope.firstName = googleObject.given_name;
            $scope.mileList = mongoData.list;

            $scope.randResult = $scope.mileList[Math.floor(Math.random() * $scope.mileList.length)];
        })
        .error(function(mongoData){
        });
        //end mongo call.
      };

    } else {
      $rootScope.AuthData = authData;
      // $rootScope.session === false;
    }
  });


  $scope.confirm = function(category , task){
    var cat = category;
    var query = task;
    console.log(cat);
    console.log(query);

    $scope.authObj.$onAuth(function(authData) {
      if (authData) {
      //this two if statments will check for either facebook or google auth.
      if (authData.provider = "facebook") {
        var facebookObject = authData.facebook.cachedUserProfile;

        ///this will handel the call nessesary for facebook users.
        $http({ method: 'POST', url: '../scripts/php/resetTasksValues.php?&firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider+'&category='+category+'&title='+$scope.task+'&id='+$scope.itemId
        }).success(function(data){
          $localStorage.session = true;
          console.log(data);
          //will direct them to their activity.
          if (category == "establishment" || category == "restaurant" || category == "cooking") {
            $location.path('/dataResults/'+category+'/'+query);
          };
          $modalInstance.dismiss('cancel');
        }).error(function(data){
          console.log()
        });

      }else if (authData.provider = "google") {
        var googleObject = authData.google.cachedUserProfile;
        ///this will handel the call nessesary for google users.
        $http({ method: 'POST', url: '../scripts/php/resetTasksValues.php?&firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider+'&category='+category+'&title='+$scope.task+'&id='+$scope.itemId
        }).success(function(data){
          $localStorage.session = true;
          //will direct them to their activity.
          if (category == "establishment" || category == "restaurant" || category == "cooking") {
            $location.path('/dataResults/'+category+'/'+query);
          };
          $modalInstance.dismiss('cancel');
        }).error(function(data){
        });
      };

      } else {
      }
    });

  };

  ///this will cancel the modal window
  $scope.cancel = function () {
    console.log($modalInstance);
    $localStorage.session = false;
    $modalInstance.dismiss('cancel');
  };

}]);
