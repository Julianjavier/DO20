<?php
	$raw_info = file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.5939260,-81.2941990&radius=1500&types=restaurant&key=AIzaSyA8ovrfj9jOPliuv-tBX9Z9pZgO9s2Cnq4');
	echo $raw_info;
?>