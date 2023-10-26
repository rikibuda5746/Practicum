<?php

//connect
include_once("../../db.php");
header('Access-Control-Allow-Methods:POST, GET,PUT, DELETE, OPTIONS');
$conn = new DbConnect();
$db = $conn->connect();

function JobRequest_GET($iJobsStockId){
  global $db;
  $result = '';
  $sql = "exec Get_CandidatesToJob @iJobsStockId=:iJobsStockId ";
  $get_user = $db->prepare($sql);
  $get_user->bindParam(':iJobsStockId', $iJobsStockId);
  $get_user_success = $get_user->execute();
  if($get_user_success) {
    $result = array();
    while ($row = $get_user->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
          'userId'=> $row ['iUserId'],
          'firstName'=>$row ['nvFirstName'],
          'lastName'=>$row ['nvLastName'],
          'phone'=>$row ['nvPhone'],
          'email'=>$row ['nvEmail'],
          'datePublish'=>$row ['dtDateJobRequest'],
          'iStatusJobRequestId'=>$row ['iStatusJobRequestId'],
          'idJobstock'=>$row ['iJobsStockId'],
          'favorite'=>$row ['bIsFavoriteByManager'],
        )
      );
    }  }
  return $result;
}

$result = JobRequest_GET($_GET['iJobsStockId']);

echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>
