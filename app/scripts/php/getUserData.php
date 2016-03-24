<?
ini_set('display_errors', 1);
// require 'vendor/autoload.php';
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);


$key = true;

if ($key == true) {

	$mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");

	//sets the connection
	$cursor = $mongo->selectDb('do20')->selectCollection('userData');
	//sets the filter.
	$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);
	//holds the data
	$data = $cursor->find($filter);

	$length = count(iterator_to_array($data));
	//check for data and creates basic user fields if user is nat in database.
	if ($length <= 0) {
		$data = $cursor->insert(
		array(
			"firstName" => $firstName,
			"lastName" => $lastName,
			"provider" => $provider,
			"score"=> 0,
			"tasks" => 0,
			"mileList" => array(),
			"savedResults" => array()
			)
		);
		//returns new user.
		$query = $cursor->find($filter);
        foreach($query as $result){
            $result['firstName'];
            $result['lastName'];
            $result['provider'];
            $result['score'];
            $result['tasks'];
            $result['mileList'];
            $obj = array('firstName' => $result['firstName'] , 'lastName' => $result['lastName'], 'provider' => $result['provider'] ,'score' => $result['score'], 'tasks' => $result['tasks'], 'mileList' => $result['mileList']);
            echo json_encode($obj);
		};

	}else{
		//this makes sure user cannot have more that 20 point sin tasks.
		$dataCleaner = $cursor->find($filter);
		foreach($dataCleaner as $result){
			if ( $result['tasks'] >= 20){
				$dataCleaner = $cursor->update( $filter,
						array(
							'$set' => array("tasks" => 20)
						)
				);
			};
		};
        //this returns user data as the result.
        foreach($data as $result){
            $result['firstName'];
            $result['lastName'];
            $result['provider'];
            $result['score'];
            $result['tasks'];
            $result['mileList'];
            $obj = array('firstName' => $result['firstName'] , 'lastName' => $result['lastName'], 'provider' => $result['provider'] ,'score' => $result['score'], 'tasks' => $result['tasks'], 'mileList' => $result['mileList']);
            echo json_encode($obj);
		};
	};

}

?>
