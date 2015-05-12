<?php
	$cat = ($_GET['category']); 
	$keyWord = ($_GET['keyWord']);
	$urlSafeQuery = urlencode($keyWord);

   	//This is the start of the api call.
    // create curl resource 
    $ch = curl_init(); 
    // set url 
    curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=50000&types=".$cat."&keyword=".$urlSafeQuery."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4"); 
    //return the transfer as a string 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    // $output contains the output string 
    $output = curl_exec($ch); 
    $raw_data = json_decode($output);
    //This is the end of the api call.

	$full_api = $raw_data->{'results'};
	
	if (count($full_api)){
		$number = array_rand($full_api);
		$result = $full_api[$number];
		$id = $result->place_id;
		// $api = json_encode($result);
		
		//From here on, this is the second call for the place details
		curl_setopt($ch, CURLOPT_URL,"https://maps.googleapis.com/maps/api/place/details/json?placeid=".$id."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4" );
		//return the transfer as a string 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		// $secondOutput contains the output string 
		$secondOutput = curl_exec($ch); 
		$second_data = json_decode($secondOutput);
	    //This is the end of the api call.

		$full_details = $second_data->{'result'};

		echo json_encode($full_details);
		//This ends the second call.

		//This simply verifies if the photo key is present and snds th proper information.
		// if (property_exists($result, 'photos') === true){
		// 	echo "[".$api.",".json_encode("https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheigh=200&photoreference=".$result->{'photos'}[0]->{'photo_reference'}."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4")."]";
		// } else {
		// 	echo "[".json_encode($result)."]";
		// };

		// close curl resource to free up system resources 
	}else{
		echo "derp";
	}

    curl_close($ch);
?>