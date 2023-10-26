<?php
include_once("../db.php");
$conn = new DbConnect();
$db = $conn->connect();


function get_manager_jobs()
{
  global $db;
  $result = '';
  $sql = 'exec JobsStock_slct';
  $get_jobs = $db->prepare($sql);
  $get_jobs_success = $get_jobs->execute();
  if ($get_jobs_success) {
    $result = array();
    while ($row = $get_jobs->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
          'JobStockId' => $row['iJobsStockId'],
          'InstitutionName' => $row['nvInstitutionName'],
          'DateBegin' => $row['dtDateBegin'],
          'DateEnd' => $row['dtDateEnd'],
          'JobName' => $row['nvJobName'],
          'AgeGroupName' => $row['nvAgeGroupName'],
          'HoursOfJobsName' => $row['nvHoursOfJobsName'],
          'AreaName' => $row['nvAreaName'],
          'CityName' => $row['nvCityName'],
          'ExperienYears' => $row['iExperienYears'],
          'IsPublic' => $row['bIsPublic'],
          'IsOpen' => $row['bIsOpen'],
          'TypesOfJobsName' => $row['nvTypesOfJobsName'],
          'DatePublish' => $row['dtDatePublish'],
          'JobDescription' => $row['nvJobDescription'],
          'DateJobRequest' => $row['dtDateJobRequest'],
          'favorite' => $row['favorite'],
          'minSalary' => $row['iMinSalary'],
          'maxSalary' => $row['iMaxSalary'],
        )
      );
    }
  }
  return $result;
}

$result = get_manager_jobs();
echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>