<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);

$id = ($_GET['id']);


$key = true;

if ($key == true) {
	$mongo = new MongoClient("mongodb://${Bodark216}:${Durandal216}@localhost");
	$cursor = $mongo ->selectDb('do20')->selectCollection('userData');

	$filter = array('firstName' => $firstName);

	$data = $cursor->find( $filter );
	$length = count(iterator_to_array($data));
	
	if ($length <= 0) {
		$data = $cursor->insert(
		array(
			"firstName" => $firstName,
			"lastName" => $lastName,
			"id" => $id,
			"score"=> intval(0),
			"tasks" => intval(0)
			)
		);	

		$data = $cursor->find($filter);
		$id = $data->_id;
		echo "[".json_encode(iterator_to_array($data))."]";	
	}else{
		echo "[".json_encode(iterator_to_array($data))."]";
	};

}

?>