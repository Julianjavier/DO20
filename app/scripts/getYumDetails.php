<?php  
	$id = ($_GET['id']); 
	$urlSafeQuery = urlencode($id);
	$api = "http://api.yummly.com/v1/api/recipe/".$id."?_app_id=835c05a2&_app_key=5d0e15329a55763e866fdcbfffc512f6";
	$api_data = file_get_contents($api);
	echo $api_data;
?>