<?
ini_set('display_errors', 1);
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);
$points = ($_GET['points']);
$category = ($_GET['category']);
$id = ($_GET['id']);
$title = ($_GET['title']);

// $mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$mongo = new MongoClient();

//sets the connection.
$rawData = $mongo ->selectDb('do20')->selectCollection('userData');
//sets the filter
$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);
//inserts the data.
$data = $rawData->update( $filter,
	array(
		'$inc' => array("score"=> intval($points), "tasks" => 1),
		'$push' => array(
			"savedItems"=> array(
				'title' => $title, 'id' => $id, 'category' => $category)
			)
		)
	);

?>
