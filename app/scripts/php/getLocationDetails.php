<?php  
	$id = ($_GET['id']); 
	
	$ch = curl_init(); 

	curl_setopt($ch, CURLOPT_URL,"https://maps.googleapis.com/maps/api/place/details/json?placeid=".$id."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4" );
	//return the transfer as a string 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	// $secondOutput contains the output string 
	$output = curl_exec($ch); 
	$data = json_decode($output);
	//This is the end of the api call.

	$full_details = $data->{'result'};

	echo json_encode($full_details);

	// close curl resource to free up system resources 
    curl_close($ch);
?>