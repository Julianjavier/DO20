<?php
	$cat = ($_GET['category']); 
	// $urlSafeQuery = urlencode($q);
	$api = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=".$cat."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4";
	$api_data = json_decode(file_get_contents($api));
	$raw_info = file_get_contents($url);
	echo $raw_info;
?>