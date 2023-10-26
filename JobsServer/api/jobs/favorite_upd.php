<?php
include_once("../../db.php");
header('Access-Control-Allow-Methods:GET,HEAD,PUT,PATCH,POST,DELETE');
$conn = new DbConnect();
$db = $conn->connect();
//functions
function Favorite_UPD()
{
  file_put_contents("D:\logs\Temp1.log",print_r(file_get_contents('php://input'), true) ); 
  $insertRequest=json_decode(file_get_contents('php://input'));
  file_put_contents("D:\logs\Temp.log",print_r($insertRequest, true) ); 
  global $db;

  $sql = "exec JobStock_favorite_UPD 
  @iJobsStockId=:iJobsStockId ,
  @iUserId=:iUserId ,
  @isFavorite=:isFavorite";
  $favorite_upd = $db->prepare($sql);
  $JobsStockId=$insertRequest->iJobsStockId;
  $UserId=$insertRequest->iUserId;
  $IsFavorite=$insertRequest->isFavorite;

  $favorite_upd->bindParam(':iJobsStockId',$JobsStockId);
  $favorite_upd->bindParam(':iUserId',$UserId);
  $favorite_upd->bindParam(':isFavorite',$IsFavorite);
  try {
    $favorite_upd->execute();
  } catch (PDOException $e) {

  }

}
Favorite_UPD();
?>
<!-- http://localhost/server/api/jobs/favorite_upd.php?&iJobsStockId=3&iUserId=1&isFavorite=0>
