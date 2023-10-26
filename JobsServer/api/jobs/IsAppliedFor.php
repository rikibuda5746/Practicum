<?php
 
include_once("../../db.php");
header('Access-Control-Allow-Methods:GET,HEAD,PUT,PATCH,POST,DELETE');
$conn = new DbConnect();
$db = $conn->connect();

function IsAppliedFor_slct($iJobsStockId ,$iUserId )
{
  global $db;
  $result = '';
  $sql = "exec dbo.IsAppliedFor_slct @iJobsStockId=:iJobsStockId ,@iUserId=:iUserId";
  $IsApplyfor = $db->prepare($sql);
  $IsApplyfor->bindParam(':iJobsStockId',$iJobsStockId);
  $IsApplyfor->bindParam(':iUserId',$iUserId);
  $IsAppliedFor_success= $IsApplyfor->execute();
  if($IsAppliedFor_success){
     $result = array();
    while ($row = $IsApplyfor->fetch(PDO::FETCH_ASSOC)) {
  array_push(
    $result,
    array(
      'applied'=> $row['applied']
    ));
  } }
   return $result[0];
  
}

$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$func = $_GET['func'];


$result=IsAppliedFor_slct($_GET['iJobsStockId'],$_GET['iUserId']);

echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>

<!-- http://localhost/server/api/jobs/IsAppliedFor.php?&iJobsStockId=1000&iUserId=600 -->