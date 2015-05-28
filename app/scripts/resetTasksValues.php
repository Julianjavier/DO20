<?
$firstName = ($_GET['firstName']); 
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);


$key = true;

if ($key == true) {
	
	$mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
	// $mongo = new Mongo();

	//This sets the connection
	$cursor = $mongo->selectDb('do20')->selectCollection('userData');
	//This will be our filter
	$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);
	//This will collect the data
	$data = $cursor->find($filter);
	
	//This iterates thru the mongo array.
	$length = count(iterator_to_array($data));
	$dataCleaner = $cursor->update( $filter, 
			array(
				'$set' => array("tasks" => 0)
			)
	);	
        

};

?>