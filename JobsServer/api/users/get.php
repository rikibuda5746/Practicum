<?php

include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

function get_user_name($user_id)
{
  global $db;

  $result = '';
  $sql = "SELECT * FROM users where user_id = :user_id";
  $get_user = $db->prepare($sql);
  $get_user->bindParam(':user_id', $user_id);
  $get_user_success = $get_user->execute();
  if($get_user_success) {
    $result = array();
    while ($row = $get_user->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
          'name_user' => $row['name_user']
        )
      );
    }
  }
  return $result;
}

$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$func = $_GET['func'];
switch ($func) {
  case '"get_all_user_details"':
    $result = get_all_user_details($_GET['user_id']);
    break;
  case '"get_user_name"':
    $result = get_user_name($_GET['user_id']);
    
  }


echo json_encode($result, JSON_UNESCAPED_UNICODE);

//http://localhost\server\api\users\get.php?func="get_sector_options"
//http://localhost\server\api\users\get.php?func="get_gender_options"
//http://localhost\server\api\users\get.php?func="get_statusFamily_options"
//http://localhost\server\api\users\get.php?func="get_countrySource_options"
?>