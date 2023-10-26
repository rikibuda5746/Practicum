<?php 
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();
//functions

function JobRequest_Remove()
{
  $RemoveC=json_decode(file_get_contents('php://input'));
  global $db;
  $sql = "exec dbo.JobRequest_Remove 
  @iJobsStockId=:iJobsStockId ,
  @iUserId=:iUserId";
  $removeCandidacy = $db->prepare($sql);

  $JobsStockId=$RemoveC->iJobsStockId ;
  $UserId=$RemoveC->iUserId ;

  $removeCandidacy->bindParam(':iJobsStockId',$JobsStockId);
  $removeCandidacy->bindParam(':iUserId',$UserId);

  try {
    $removeCandidacy->execute();
  } catch (PDOException $e) {
  }
}
JobRequest_Remove();
?>

<!-- http://localhost/server/api/jobs/removeCandidacy.php?&iJobsStockId=3&iUserId=700>
