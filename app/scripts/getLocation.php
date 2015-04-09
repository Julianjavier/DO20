<?php
	$cat = ($_GET['category']); 
	$keyWord = ($_GET['keyWord']);
	$urlSafeQuery = urlencode($keyWord);
	$api = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=".$cat."&name=".$urlSafeQuery."&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4";
	$raw_info = file_get_contents($api);
	echo $raw_info;
?>