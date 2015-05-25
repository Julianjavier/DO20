<?
$firstName = ($_GET['firstName']);
$lastName = ($_GET['lastName']);
$provider = ($_GET['provider']);

// $mongo = new MongoClient("mongodb://julianjavier:drebin893@localhost/do20");
$mongo = new Mongo();

$cursor = $mongo->selectDb('do20')->selectCollection('userData');
$filter = array('firstName' => $firstName , 'lastName' => $lastName, 'provider' => $provider);

$data = $cursor->find($filter);

foreach ($data as $listItem) {
    $obj = array('list' => $listItem['savedItems']);
    echo json_encode($obj);
};

?>