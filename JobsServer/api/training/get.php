<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

function get($iUserId)
{
  global $db;
  $result = '';
  $sql = "exec dbo.UserTraining_GET :iUserId  ";
  $get = $db->prepare($sql);
  $get->bindParam(":iUserId" ,$iUserId);
  $get_success = $get->execute();
  if($get_success){
      $result = array();
      while ($row = $get->fetch(PDO::FETCH_ASSOC)) {
          array_push(
              $result,
              array(
                  'placeTraining'=> $row['nvInstitution'],
                  'fromYear'=> $row['iDateFirst'],
                  'toYear'=> $row['iDateEnd'],
                  'typeOfTraining'=> $row['iTypesOfiTrainingId'],
                  'note'=> $row['Note']
                ));
 } }
  return $result;
 
}

$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

switch ($func) {
  case '"get"':
    $result = get($_GET['iUserId']);
    break;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>