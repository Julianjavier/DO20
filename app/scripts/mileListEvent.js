do20.controller("MileListEvnet", ["$scope", "$rootScope", "$modal", "$firebaseAuth", "$modalInstance", "$http", '$location', function($scope, $rootScope, $modal, $firebaseAuth, $modalInstance, $http, $location){
  var ref = new Firebase("https://do20.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);

  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.item);
  // };

    $scope.authObj.$onAuth(function(authData) {
    if(authData){
      //This will provide the data form the specified login provider.
      $rootScope.AuthData = authData;
      console.log($rootScope.AuthData);
      
      if(authData.provider == "facebook"){
        //This will check user information on our mongo database.
        var facebookObject = authData.facebook.cachedUserProfile;
        $http.get('../scripts/getMileList.php?firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider)
          .success(function(mongoData){
            console.log(mongoData);            
            
            $scope.firstName = facebookObject.first_name;
            $scope.mileList = mongoData.list;

            $scope.randResult = $scope.mileList[Math.floor(Math.random() * $scope.mileList.length)];
        })
        .error(function(mongoData){ 
            console.log('NOPE ',mongoData); 
        }); 
        //end mongo call.
      }else if(authData.provider == "google"){
        //This will check user information on our mongo database.
        var googleObject = authData.google.cachedUserProfile;
        $http.get('../scripts/getMileList.php?firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider)
          .success(function(mongoData){
            console.log(mongoData);
            
            $scope.firstName = googleObject.given_name;
            $scope.mileList = mongoData.list;

            $scope.randResult = $scope.mileList[Math.floor(Math.random() * $scope.mileList.length)]; 
        })
        .error(function(mongoData){ 
            console.log('NOPE ',mongoData); 
        }); 
        //end mongo call.
      };      
   
    } else {
      $rootScope.AuthData = authData;
      console.log("Logged out", authData);
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
      console.log(authData);
      //this two if statments will check for either facebook or google auth. 
      if (authData.provider = "facebook") {
        var facebookObject = authData.facebook.cachedUserProfile;

        $http({ method: 'POST', url: '../scripts/resetTasksValues.php?&firstName='+facebookObject.first_name+'&lastName='+facebookObject.last_name+'&provider='+authData.provider+'&category='+category+'&title='+$scope.task+'&id='+$scope.itemId
        }).success(function(data){
          // $scope.stat = true;
          console.log(data);
          if (category == "establishment" || category == "restaurant" || category == "cooking") {
            $location.path('/dataResults/'+category+'/'+query);     
          }; 
          $modalInstance.dismiss('cancel');
        }).error(function(data){
          console.log()
        }); 
      
      }else if (authData.provider = "google") {
        $http({ method: 'POST', url: '../scripts/resetTasksValues.php?&firstName='+googleObject.given_name+'&lastName='+googleObject.family_name+'&provider='+authData.provider+'&category='+category+'&title='+$scope.task+'&id='+$scope.itemId
        }).success(function(data){
          // $scope.stat = true;
          console.log(data);
          if (category == "establishment" || category == "restaurant" || category == "cooking") {
            $location.path('/dataResults/'+category+'/'+query);     
          };          
          $modalInstance.dismiss('cancel');
        }).error(function(data){
          console.log()
        }); 
      };      
        //
      } else {
        console.log("Logged out");
      }
    });

  };  

  $scope.cancel = function () {
    console.log($modalInstance);
    $rootScope.session = false;
    $modalInstance.dismiss('cancel');
  };

}]);