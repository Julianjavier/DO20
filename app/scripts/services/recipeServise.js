do20.config(['$provide', function($provide){
    $provide.service('foodService',['$http', '$q', '$timeout',function($http, $q, $timeout){
      var getFood = function getFood(query) {

          var deferred = $q.defer();

          //This will get information from thr yummly api and will have a finite result.
      		$http.get('../scripts/php/getYum.php?q='+ query)
      			.success(function(apiData){
      				//this sets datta for easy viewing on the front end.
      				if (apiData !== null){
                var foodData = apiData;
        				var itemId = foodData[0].id;
        				var task = foodData[0].name;
        				var img = foodData[0].images[0].hostedLargeUrl;
        				var originalSource = foodData[0].source.sourceRecipeUrl;
        				var ingredients = foodData[0].ingredientLines;
        				var yield = foodData[0].yield;
                var totalTime = foodData[0].totalTime;
                var rating = foodData[0].rating;
        				var callCompleat = false;
        				var result = {
        											itemId: itemId,
        											task: task,
        											img: img,
        											originalSource: originalSource,
        											ingredients: ingredients,
        											yield: yield,
                              totalTime: totalTime,
                              rating: rating,
        											callCompleat: callCompleat
        										};

        				deferred.resolve(result);
      				}else{
      					//thsi sends user back to the front in case of bad request or servers are down.
  	        		console.log("we got nothing");
  	        		$location.path('/')
      	      };
      			})
      			.error(function(apiData){
      				console.log('NONO ',apiData);
      			});

          return deferred.promise;
        };

        return {
          getFood: getFood
        };
  	}]);
	}]);
