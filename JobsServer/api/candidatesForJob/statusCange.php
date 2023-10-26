<?php

include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

function JobRequest_UPD()
{ 
  $data = json_decode(file_get_contents('php://input')); 
  global $db;
  $sql = "exec dbo.JobRequest_UPD @iJobsStockId=:iJobsStockId,@iUserId=:iUserId,@iStatusJobRequestId=:iStatusJobRequestId";
  $updateJobRequest = $db->prepare($sql); 
  $iJobsStockId=$data->idJobstock;
  $iUserId=$data->userId;
  $iStatusJobRequestId=$data->newStatusJobRequestId; 
  $updateJobRequest->bindParam(':iJobsStockId',$iJobsStockId);
  $updateJobRequest->bindParam(':iUserId',$iUserId);
  $updateJobRequest->bindParam(':iStatusJobRequestId',$iStatusJobRequestId);
 try {
  $updateJobRequest->execute();
  file_put_contents("D:\logs\Temp.log",print_r("ok", true)); 
 } catch (\Throwable $th) {
  file_put_contents("D:\logs\Temp.log",print_r("eror", true)); 
 }
 
}

 JobRequest_UPD();
?>

