<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);

$id = ($_GET['id']);


$key = true;

if ($key == true) {
	$mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");

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
			"score"=> 0,
			"tasks" => 0,
			"mileList" => array()
			)
		);	

		$query = $cursor->find($filter);
        foreach($query as $result){
            $result['firstName'];
            $result['score'];
            $result['tasks'];
            $obj = array('firstName' => $result['firstName'] , 'score' => $result['score'], 'tasks' => $result['tasks']);
            echo json_encode($obj);
		};	
	
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