<?
$id = ($_GET['id']);
$firstName = ($_GET['firstName']);
$lastName = ($_Get['lastName'])
$points = ($_GET['points']);
$mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$rawData = $mongo ->selectDb('do20')->selectCollection('testData');

$filter = array('firstName' => $firstName , 'lastName' => $lastName);

$data = $rawData->update( $filter,
	array(
		'$inc' => array("score"=> intval($points), "tasks" => 1)
		)
	);

?>