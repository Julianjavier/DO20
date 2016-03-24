<?
ini_set('display_errors', 1);
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);
$category = ($_GET['category']);
$task = ($_GET['task']);
$title = ($_GET['title']);

$mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
// $mongo = new MongoClient();
//sets the connection
$rawData = $mongo ->selectDb('do20')->selectCollection('userData');
//sets the filter.
$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);
//updates the data.
$data = $rawData->update( $filter,
	array(
		'$push' => array(
			"mileList"=> array(
				'category' => $category, 'task' => $task, 'title' => $title)
			)
		)
	);
echo "Response is good";

?>
