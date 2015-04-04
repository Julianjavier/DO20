do20.controller('GoogleLocation', ['$scope', '$http', function($scope, $http){
	// var goog = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=restaurant&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4';
	var category = 'cooking';
	var q = 'onion%20soup';
	if (category == 'restaurant' || category == 'entertainment') {
		$http.get('../scripts/getLocation.php?category='+category)
	        .success(function(data){
	        	var limit = data.results.length;
	        	var number = Math.floor((Math.random() * limit) + 1);
	        	console.log('We got ', number);
	        	console.log('Witch is', data.results[number].name);
	        	console.log('Witch is', data.results[number].place_id);
	        	console.log('Witch is', data.results[number].rating);
	        	console.log('Witch is', data.results[number].vicinity);
	        })
	        .error(function(data){ 
	        	console.log('NONO ',data); 
	        });
    }else if (category == 'cooking') {
		$http.get('../scripts/getYum.php?q='+q)
			.success(function(data){
				// var limit = data.results.length;
	   //      	var number = Math.floor((Math.random() * limit) + 1);
	   //      	console.log('We got ', number);
	        	console.log(data);
			})
			.error(function(data){
				console.log('NONO ',data);
			});
    };
}]);