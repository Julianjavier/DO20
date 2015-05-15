<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);

$id = ($_GET['id']);


$key = true;
$output = array();

echo "Before connection ";
if ($key == true) {
	echo "after IF ";
	$mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
	echo "after connection ";

	$cursor = $mongo->selectDb('do20')->selectCollection('userData');
	$filter = array('firstName' => $firstName);

	$data = $cursor->find($filter);
	
	$length = count(iterator_to_array($data));
	
	if ($length <= 0) {
		$data = $cursor->insert(
		array(
			"firstName" => $firstName,
			"lastName" => $lastName,
			"id" => $id,
			"score"=> intval(0),
			"tasks" => intval(0),
			"mileList" => array()
			)
		);	

		echo "[".json_encode(iterator_to_array($output))."]";	
	}else{
        foreach($data as $result){
            $result['firstName'];
            $result['score'];
            $result['tasks'];
            $obj = array('firstName' => $result['firstName'] , 'score' => $result['score'], 'tasks' => $result['tasks']);
            echo json_encode($obj);
        };
	};

}

?>