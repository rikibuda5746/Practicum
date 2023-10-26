<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

function get($tableName, $idColumnName, $valueColumnName)
{
  global $db;
  $result = '';
  $sql = "SELECT $idColumnName as 'id', $valueColumnName as 'value'  FROM $tableName";
  $get = $db->prepare($sql);
  $get_success = $get->execute();
  if ($get_success) {
    $result = $get->fetchAll(PDO::FETCH_ASSOC);
  }
  return $result;
}

$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

switch ($func) {
  case 'get':
    $result = get($_GET['tableName'],$_GET['idColumnName'],$_GET['valueColumnName']);
    break;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>





