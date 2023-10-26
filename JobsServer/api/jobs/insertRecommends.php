<?php
 
//connect
include_once("../../db.php");
header('Access-Control-Allow-Methods:GET,HEAD,PUT,PATCH,POST,DELETE');
$conn = new DbConnect();
$db = $conn->connect();

//functions
function UserRecommends_INS($nvName ,$nvJob ,$Note,$nvPhone,$nvEmail ,$iUserId,$iJobsStockId)
{
  global $db;
  $sql = "exec dbo.UserRecommends_INS @nvName=:nvName ,@nvJob=:nvJob ,@Note=:Note, @nvPhone=:nvPhone,@nvEmail=:nvEmail ,@iUserId=:iUserId,@iJobsStockId=:iJobsStockId";
  $insertRecommends = $db->prepare($sql);
  $insertRecommends->bindParam(':nvName',$nvName);
  $insertRecommends->bindParam(':nvJob',$nvJob);
  $insertRecommends->bindParam(':Note',$Note);
  $insertRecommends->bindParam(':nvPhone',$nvPhone);
  $insertRecommends->bindParam(':nvEmail',$nvEmail);
  $insertRecommends->bindParam(':iUserId',$iUserId);
  $insertRecommends->bindParam(':iJobsStockId',$iJobsStockId);
  $UserRecommends_INS= $insertRecommends->execute();
}


//exec
$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$func = $_GET['func'];

UserRecommends_INS($_GET['nvName'],$_GET['nvJob'],$_GET['Note'],$_GET['nvPhone'],$_GET['nvEmail'],$_GET['iUserId'],$_GET['iJobsStockId']);


echo json_encode( JSON_UNESCAPED_UNICODE);
?>

<!-- http://localhost/server/JobsServer/api/jobs/insertRecommends.php?nvName=aa&nvJob=ss&Note=nn&nvPhone=9&nvEmail=da@gmail.com&iUserId=1&iJobsStockId=2 -->
