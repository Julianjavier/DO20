<?
$user = ($_GET['user']); 
$id = ($_GET['id']);
$points = ($_GET['points']);
$mongo = new Mongo();
$rawData = $mongo ->selectDb('do20')->selectCollection('testData');

$filter = array('id' => $id);

$data = $rawData->find( $filter );

echo json_encode(iterator_to_array($data));
?>