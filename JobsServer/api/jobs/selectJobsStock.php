<?php

include_once("../../db.php");
header('Access-Control-Allow-Methods:GET,HEAD,PUT,PATCH,POST,DELETE');
$conn = new DbConnect();
$db = $conn->connect();

function get_all_jobs_details($iUserId)
{
  global $db;
  $result = '';
  $sql = "exec JobsStock_slct @userId=:iUserId";
  $get_jobs = $db->prepare($sql);
  $get_jobs->bindParam(':iUserId',$iUserId);
  $get_jobs_success = $get_jobs->execute();
  if($get_jobs_success) {
    $result = array();
    while ($row = $get_jobs->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
          'iJobsStockId' => $row['iJobsStockId'],
          'iLnstitution' => $row['iLnstitution'],
          'dtDateBegin' => $row['dtDateBegin'],
          'dtDateEnd' => $row['dtDateEnd'],
          'nvJobName' => $row['nvJobName'],
          'iAgeGroupId' => $row['iAgeGroupId'],
          'iHoursOfJobsId' => $row['iHoursOfJobsId'],
          'nvAreaName' => $row['nvAreaName'],
          'nvCityName' => $row['nvCityName'],
          'iExperienYears' => $row['iExperienYears'],
          'bIsPublic' => $row['bIsPublic'],
          'bIsOpen' => $row['bIsOpen'],
          'nvTypesOfJobsName' => $row['nvTypesOfJobsName'],
          'dtDatePublish' => $row['dtDatePublish'],
          'nvJobDescription' => $row['nvJobDescription'],
          'favorite'=> $row['favorite'],
          'dtDateJobRequest'=> $row['dtDateJobRequest'],
          'iMinSalary'=> $row['iMinSalary'],
          'iMaxSalary'=> $row['iMaxSalary'],
          'bIsMonthlySalary'=> $row['bIsMonthlySalary']
        )
      );
    }  }
  return $result;

}

$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$func = $_GET['func'];
switch ($func) {
  case '"get_all_jobs_details"':
    $result = get_all_jobs_details($_GET['iUserId']);
    break;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

// // exemp: http://localhost/server/api/jobs/selectJobsStock.php?func="get_all_jobs_details"&iUserId=1
// <!--      http://localhost/server/api/jobs/insertRecommends.php?func="UserRecommends_INS"&nvName"=aa&nvJob=ss&Note=nn&nvPhone=09&nvEmail=bdf2&iUserId=1&iJobsStockId=2-->


 ?>