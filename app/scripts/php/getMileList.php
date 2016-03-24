<?
ini_set('display_errors', 1);
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);

$mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
// $mongo = new MongoClient();

//sets the connection.
$cursor = $mongo->selectDb('do20')->selectCollection('userData');
//sets the filter.
$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);
//this holds data.
$data = $cursor->find($filter);
//this iterates thru the results and inserts it into an object.
foreach ($data as $userData) {
    $obj = array('list' => $userData['mileList'], 'history' => $userData['savedResults']);
    echo json_encode($obj);
};

?>
