<?php
include_once("../../db.php");
header('Access-Control-Allow-Methods:POST, GET,PUT, DELETE, OPTIONS');
$conn = new DbConnect();
$db = $conn->connect();
function JobsStokPrincipel_GET($idPrincipel)
{
  global $db;
  $result = '';
  $sql = "exec JobsStokPrincipel_GET @iInstitutionId=:idPrincipel";
  $get_user = $db->prepare($sql);
  $get_user->bindParam(':idPrincipel',$idPrincipel);
  $get_user_success = $get_user->execute();
  if($get_user_success) {
    $result = array();
    while ($row = $get_user->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
          'JobsStockId' => $row['iJobsStockId'],
          'InstitutionName' => $row['nvInstitutionName'],
          'dtDateBegin' => $row['dtDateBegin'],
          'dtDateEnd'=>$row['dtDateEnd'],
          'JobName' => $row['nvJobName'],
          'GroupName' => $row['nvAgeGroupName'],
          'HoursOfJobsName' => $row['nvHoursOfJobsName'],
          'AreaName' => $row['nvAreaName'],
          'CityName' => $row['nvCityName'],
          'ExperienYears' => $row['iExperienYears'],
          'IsPublic' => $row['bIsPublic'],
          'IsOpen' => $row['bIsOpen'],
          'TypesOfJobsName' => $row['nvTypesOfJobsName'],
          'DatePublish' => $row['dtDatePublish'],
          'JobDescription'=>$row['nvJobDescription'],
          'MinSalary'=>$row['iMinSalary'],
          'MaxSalary' =>$row['iMaxSalary'],
        )
      );
    }  }
  return $result;
}

 
function OnchangeIsopen_UPD($IsOpen ,$JobsStockId)
{
  global $db;
  $sql = "exec onchangeIsopen_UPD @bIsopen=:bIsOpen,@iJobsStockId=:iJobsStockId";
  $updateIsopen = $db->prepare($sql);
  $updateIsopen->bindParam(':bIsOpen', $IsOpen);
  $updateIsopen->bindParam(':iJobsStockId', $JobsStockId);
  $updateIsopen_success= $updateIsopen->execute();
}


$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);
$func = $_GET['func'];
switch ($func) {
  case '"JobsStokPrincipel_GET"':
   $result= JobsStokPrincipel_GET($_GET['idPrincipel']);
    break;
  case '"OnchangeIsopen_UPD"':
      OnchangeIsopen_UPD($_GET['IsOpen'],$_GET['JobsStockId']);
      break;
  }

echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>

