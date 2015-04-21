<?php
	$cat = ($_GET['category']); 
	$keyWord = ($_GET['keyWord']);
	$urlSafeQuery = urlencode($keyWord);

   	//This is the start of the api call.
    // create curl resource 
    $ch = curl_init(); 
    // set url 
    curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=".$cat."&name=".$urlSafeQuery."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4"); 
    //return the transfer as a string 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    // $output contains the output string 
    $output = curl_exec($ch); 
    $raw_data = json_decode($output);
    //This is the end of the api call.
	
	$number = count($raw_data->{'results'});
	$randomInt = rand(0 , $number);

	$full_api = $raw_data->{'results'};
	$number = array_rand($full_api);
	$result = $full_api[1];

	

	if (property_exists($result, 'photos') === true){
		//This is the start of the second call.
	    // create curl resource 
	    $ch2 = curl_init(); 
	    // set url 
	    curl_setopt($ch2, CURLOPT_URL, "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=".$result->{'photos'}[0]->{'photo_reference'}."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4"); 
	    //return the transfer as a string 
	    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1); 
	    // $output contains the output string 
	    $second_output = curl_exec($ch2); 
	};

	if (property_exists($result, 'photos') === true){
		echo "[".json_encode($result).",".$second_output."]";
	} else {
		echo "[".json_encode($result)."]";
	};

	// close curl resource to free up system resources 
    curl_close($ch);
    curl_close($ch2);
?>