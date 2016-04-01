do20.config(['$provide', function($provide){
    $provide.service('locationService',['$http', '$q', '$timeout',function($http, $q, $timeout){
      var getLocation = function getLocation(category, query, lat, lon) {

          var deferred = $q.defer();

          $http.get('../scripts/php/getLocation.php?category='+ category +'&keyWord='+ query +"&lat="+ lat + "&lon="+ lon)
                .success(function(apiData, status, header, config){
                  if (apiData !== null){
                    console.log(apiData);
                  //this will segmante the data for easy call to the front end.
                  var itemId = apiData.place_id;
                  var placeData = apiData;
                  var itemId = placeData.place_id;
                  var name = placeData.name;
                  var hours = placeData.opening_hours.weekday_text;
                  var vicinity = placeData.vicinity;
                  var phone = placeData.formatted_phone_number
                  //this mearly check for inconsistint data.
                  if (placeData.rating){
                    var rating = placeData.rating;
                  };
                  if(apiData.opening_hours){
                    var status = apiData.opening_hours.open_now;
                  };
                  //this sets variables for maps location.
                  var latitude = placeData.geometry.location.lat;
                  var longitude = placeData.geometry.location.lng;
                  //This will be used to allow original source viewing.
                  var originalSource = "https://www.google.com/maps/place/"+placeData.formatted_address;
                  var callCompleat = false;
                  var result = {
                                name: name,
                                itemId: itemId,
                                placeData: placeData,
                                rating: rating,
                                status: status,
                                latitude: latitude,
                                longitude: longitude,
                                originalSource: originalSource,
                                callCompleat: callCompleat,
                                hours: hours,
                                vicinity: vicinity,
                                phone: phone
                              };

                  deferred.resolve(result);
                  }else{
                    console.log("we got nothing");
                    $location.path('/');
                };
              })
              .error(function(apiData){
                  console.log('NONO ',apiData);
              });

          return deferred.promise;
        };

        return {
          getLocation: getLocation
        };
  	}]);
	}]);
