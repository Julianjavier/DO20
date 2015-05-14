<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);

$id = ($_GET['id']);


$key = true;

echo "Before connection ";
if ($key == true) {
	echo " after IF";
	$mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost");
	echo "after connection ". $mongo;

	// $cursor = $mongo ->selectDb('do20')->selectCollection('userData');

	// $filter = array('firstName' => $firstName);

	// $data = $cursor->find( $filter );
	// $length = count(iterator_to_array($data));
	
	// if ($length <= 0) {
	// 	$data = $cursor->insert(
	// 	array(
	// 		"firstName" => $firstName,
	// 		"lastName" => $lastName,
	// 		"id" => $id,
	// 		"score"=> intval(0),
	// 		"tasks" => intval(0)
	// 		)
	// 	);	

	// 	$data = $cursor->find($filter);
	// 	$id = $data->_id;
	// 	echo "[".json_encode(iterator_to_array($data))."]";	
	// }else{
	// 	echo "[".json_encode(iterator_to_array($data))."]";
	// };

}

?>