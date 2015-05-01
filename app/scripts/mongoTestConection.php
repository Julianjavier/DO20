<?
$id = ($_GET['id']);
$points = ($_GET['points']);
$mongo = new Mongo();
$rawData = $mongo ->selectDb('do20')->selectCollection('testData');

$filter = array('id' => $id);

$data = $rawData->update( $filter,
	array(
		'$inc' => array("score"=> intval($points))
		)
	);

// echo json_encode(iterator_to_array($data));
?>