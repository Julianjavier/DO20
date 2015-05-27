<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);


$key = true;

if ($key == true) {
	
	// $mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
	$mongo = new Mongo();


	$cursor = $mongo->selectDb('do20')->selectCollection('userData');
	$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);

	$data = $cursor->find($filter);
	
	$length = count(iterator_to_array($data));

	$dataCleaner = $cursor->update( $filter, 
			array(
				'$set' => array("tasks" => 0)
			)
	);	
        

};

?>