do20.controller('GoogleLocation', ['$scope', '$http', function($scope, $http){
	// var goog = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=restaurant&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4';
	$http.get('../scripts/getLocation.php')
        .success(function(data){ console.log('YAYA ',data); })
        .error(function(data){ console.log('NONO ',data); });
}]);