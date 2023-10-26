<?php

include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();


function addTraining()
{
  $data = json_decode(file_get_contents('php://input'));
  file_put_contents("D:\logs\Temp3.log",print_r(file_get_contents('php://input'), true) );
  file_put_contents("D:\logs\Temp.log",print_r($training, true) );

  global $db;
  $sql = "exec dbo.UserTraining_INS 
  @iUserId=:iUserId,
  @nvInstitution=:nvInstitution,
  @iDateFirst=:iDateFirst,
  @iDateEnd=:iDateEnd,
  @iTypesOfiTrainingId=:iTypesOfiTrainingId,
  @Note=:Note";
  $addTraining = $db->prepare($sql);
  $iUserId = $data->userId;
  $nvInstitution = $data->training->placeTraining;
  $iDateFirst = $data->training->fromYear;
  $iDateEnd = $data->training->toYear;
  $iTypesOfiTrainingId = $data->training->typeOfTraining;
  $nvNote = $data->training->note;
  $addTraining = $db->prepare($sql);
  $addTraining->bindParam(':iUserId', $iUserId);
  $addTraining->bindParam(':nvInstitution', $nvInstitution);
  $addTraining->bindParam(':iDateFirst', $iDateFirst); 
  $addTraining->bindParam(':iDateEnd', $iDateEnd);
  $addTraining->bindParam(':iTypesOfiTrainingId', $iTypesOfiTrainingId);
  $addTraining->bindParam(':Note', $nvNote); 
   echo("ok");
   try {
    $addTraining->execute();
    // file_put_contents("D:\logs\Temp3.log",print_r("Succses", true) );
} catch (PDOException $e) {
    // file_put_contents("D:\logs\Temp4.log",print_r($e, true) );
}
}

addTraining();

echo  'succeded';
?>


