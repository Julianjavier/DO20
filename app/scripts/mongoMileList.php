<?
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);
$category = ($_GET['category']);
$task = ($_GET['task']);

//$mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$mongo = new Mongo();

$rawData = $mongo ->selectDb('do20')->selectCollection('userData');

$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);

$data = $rawData->update( $filter, 
	array(
		'$push' => array(
			"mileList"=> array(
				'category' => $category, 'task' => $task)
			)
		)
	);
echo "Response is good";

?>