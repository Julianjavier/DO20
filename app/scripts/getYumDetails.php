<?php  
 	$id = ($_GET['id']); 
	$urlSafeQuery = urlencode($id);
	$ch = curl_init(); 	
	//This is the start of the first call.
  // set url 
	curl_setopt($ch, CURLOPT_URL, "http://api.yummly.com/v1/api/recipe/".$id."?_app_id=835c05a2&_app_key=5d0e15329a55763e866fdcbfffc512f6"); 
	//return the transfer as a string 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	// $output contains the output string 
	$output = curl_exec($ch); 
	//This is the end of the call.
	echo "[".$output."]";

  // close curl resource to free up system resources 
  curl_close($ch);   
?>