<?
$id = ($_GET['id']);
$firstName = ($_GET['firstName']);
$lastName = ($_Get['lastName']);
$category = ($_GET['category']);
$task = ($_GET['task']);
$mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$rawData = $mongo ->selectDb('do20')->selectCollection('testData');

$filter = array('firstName' => $firstName , 'lastName' => $lastName);

$data = $rawData->update( $filter, 
	array(
		'$push' => array(
			"mileList"=> array(
				'category' => $category, 'task' => $task)
			)
		)
	);

?>