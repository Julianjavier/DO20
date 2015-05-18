<?
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);
$points = ($_GET['points']);
// $mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$mongo = new Mongo();
$rawData = $mongo ->selectDb('do20')->selectCollection('userData');

$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);

$data = $rawData->update( $filter,
	array(
		'$inc' => array("score"=> intval($points), "tasks" => 1)
		)
	);

?>