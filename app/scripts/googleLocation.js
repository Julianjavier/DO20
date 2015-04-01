do20.controller('GoogleLocation', ['$scope', '$http', function($scope, $http){
	// var goog = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=restaurant&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4';
	var category = 'restaurant'
	$http.get('../scripts/getLocation.php?category='+category)
        .success(function(data){
        	var limit = data.results.length;
        	var number = Math.floor((Math.random() * 10) + 1);
        	// console.log('We got ', data);
        	console.log('We got ', number);
        	console.log('Witch is', data.results[number]);
        })
        .error(function(data){ 
        	console.log('NONO ',data); 
        });
}]);