<?php
	//This script will get the variables from angular so they may echo out the results,
	//as well as making sure they are url safe. 
    $q = ($_GET['q']); 
	$urlSafeQuery = urlencode($q);
    
   	//This is the start of the first call.
    // create curl resource 
    $ch = curl_init(); 
    // set url 
    curl_setopt($ch, CURLOPT_URL, "http://api.yummly.com/v1/api/recipes?_app_id=835c05a2&_app_key=5d0e15329a55763e866fdcbfffc512f6&q='".$urlSafeQuery."&maxResult=16&start=1&requirePictures=true"); 
    //return the transfer as a string 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    // $output contains the output string 
    $output = curl_exec($ch); 
    $raw_data = json_decode($output);
    //This is the end of the first call.
   	
   	$number = count($raw_data->{'matches'});
   	$randomInt = rand(0 , $number);

   	//Here I will isolate the data I need from the first call and second call.
   	$api = $raw_data->{'matches'}[$randomInt];
   	$id = $api->{'id'};

	// echo json_encode($api);

	//This is the start of the second call.
    // create curl resource 
    $ch2 = curl_init(); 
    // set url 
    curl_setopt($ch2, CURLOPT_URL, "http://api.yummly.com/v1/api/recipe/".$id."?_app_id=835c05a2&_app_key=5d0e15329a55763e866fdcbfffc512f6"); 
    //return the transfer as a string 
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1); 
    // $output contains the output string 
    $second_output = curl_exec($ch2); 
    //This is the end of the second call.
    
    echo "[".$second_output.",".json_encode($api)."]";




    // close curl resource to free up system resources 
    curl_close($ch);
    curl_close($ch2);
?>