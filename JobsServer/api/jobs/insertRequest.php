<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();
//functions

function InsertRequest_INS()
{
  $InsertR=json_decode(file_get_contents('php://input'));
  global $db;
  $sql = "exec dbo.JobRequest_INS 
  @iJobsStockId=:iJobsStockId ,
  @iUserId=:iUserId";

  $insertRequest = $db->prepare($sql);
  $JobsStockId=$InsertR->iJobsStockId;
  $UserId=$InsertR->iUserId;

  $insertRequest->bindParam(':iJobsStockId',$JobsStockId);
  $insertRequest->bindParam(':iUserId',$UserId);
  try {
    $insertRequest->execute();
  } catch (PDOException $e) {

  }

}


InsertRequest_INS();

?>

<!-- http://localhost/server/api/jobs/insertRequest.php?&iJobsStockId=3&iUserId=803>
