<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);

$id = ($_GET['id']);


$key = true;

if ($key == true) {
	$mongo = new Mongo();
	$cursor = $mongo ->selectDb('do20')->selectCollection('testData');

	$filter = array('id' => $id);

	$data = $cursor->find( $filter );
	$length = count(iterator_to_array($data));
	
	if ($length <= 0) {
		$data = $cursor->insert(
		array(
			"firstName" => $firstName,
			"lastName" => $lastName,
			"id" => $id,
			"score"=> intval(0)
			)
	);	

		$data = $cursor->find( $filter );
		echo json_encode(iterator_to_array($data1));	
	
	}else{
		echo json_encode(iterator_to_array($data));	
	};

}

?>