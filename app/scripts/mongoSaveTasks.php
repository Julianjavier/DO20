<?
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);
$category = ($_GET['category']);
$id = ($_GET['id']);
$title = ($_GET['title']);

$mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
// $mongo = new Mongo();

$rawData = $mongo ->selectDb('do20')->selectCollection('userData');

$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);

$data = $rawData->update( $filter, 
	array(
		'$push' => array(
			"savedItems"=> array(
				'title' => $category, 'id' => $task, 'category' => $category)
			)
		)
	);
echo "Response is good";

?>