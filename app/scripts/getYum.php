<?php
	$q = ($_GET['q']); 
	$urlSafeQuery = urlencode($q);
	$api = "http://api.yummly.com/v1/api/recipes?_app_id=835c05a2&_app_key=5d0e15329a55763e866fdcbfffc512f6&q='".$urlSafeQuery."&maxResult=16&start=1";
	$api_data = file_get_contents($api);
	echo $api_data;
?>