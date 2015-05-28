<?
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);
$category = ($_GET['category']);
$id = ($_GET['id']);
$title = ($_GET['title']);

// $mongo =  new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$mongo = new Mongo();
//sets the connection.
$rawData = $mongo ->selectDb('do20')->selectCollection('userData');
//sets the filter.
$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);
//inserts the document.
$data = $rawData->update( $filter, 
	array(
		'$push' => array(
			"savedItems"=> array(
				'title' => $category, 'id' => $task, 'category' => $category)
			)
		)
	);

?>