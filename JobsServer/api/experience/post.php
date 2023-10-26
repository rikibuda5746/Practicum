<?php

include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();


function addExperience()
{
  $data = json_decode(file_get_contents('php://input'));
  file_put_contents("D:\logs\Temp4.log",print_r(file_get_contents('php://input'), true) );
  file_put_contents("D:\logs\Temp5.log",print_r($training, true) );

  global $db;
  $result = '';
  $sql = "exec dbo.UserExperience_INS
  @iUserId = :iUserId,
  @nvInstitution = :nvInstitution,
  @iDateFirst = :iDateFirst,
  @iDateEnd = :iDateEnd,
  @iJobId = :iJobId,
  @nvDescribe = :nvDescribe";
  $addExperience = $db->prepare($sql);
  $iUserId=$data->userId;
  $nvInstitution=$data->experience->placeExperience;
  $iDateFirst=$data->experience->fromYear;
  $iDateEnd=$data->experience->toYear;
  $iJobId=$data->experience->job;
  $nvDescribe=$data->experience->description;
  $addExperience->bindParam(':iUserId', $iUserId);
  $addExperience->bindParam(':nvInstitution', $nvInstitution);
  $addExperience->bindParam(':iDateFirst', $iDateFirst);
  $addExperience->bindParam(':iDateEnd', $iDateEnd);
  $addExperience->bindParam(':iJobId', $iJobId);
  $addExperience->bindParam(':nvDescribe', $nvDescribe); 
  try {
    $addExperience->execute();
    // file_put_contents("D:\logs\Temp3.log",print_r("Succses", true) );
  } 
  catch (PDOException $e) {
    // file_put_contents("D:\logs\Temp4.log",print_r($e, true) );
  }
}

addExperience();
echo "hello to everyone!! I`m php and i added right now a new experience"

?>