<?php

include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

function get_recomend_byId($iUserId)
{
  global $db;
  $result = '';
  $sql = "exec UserRecommends_GET
  @iUserId=:iUserId";
  $get_user = $db->prepare($sql);
  $get_user->bindParam(':iUserId', $iUserId);

  $get_user_success = $get_user->execute();
  if($get_user_success) {
    $result = array();
    while ($row = $get_user->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
            'iRecommenId' =>$row['iRecommenId'],
            'nvName' =>$row['nvName'],
            'nvJob'=>$row['nvJob'],
            'Note'=>$row['Note'],
            'nvPhone'=>$row['nvPhone'],
            'nvEmail'=>$row['nvEmail'],
            'iUserId'=>$row['iUserId'],
            'iJobsStockId'=>$row['iJobsStockId']
        )
      );
    } 
   }
    
  return $result;
}

$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$result = get_recomend_byId($_GET['iUserId']);


echo json_encode($result, JSON_UNESCAPED_UNICODE);

// exemp: http://localhost/server/api/getRecommendById.php?iUserId=1
?>







