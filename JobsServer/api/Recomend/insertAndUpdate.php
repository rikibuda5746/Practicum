<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

// file_put_contents("D:\logs\Enter.log",print_r("נכנס", true)); 

function insert_update()
{

$file = fopen("D:\logs\Enter.log.txt", "w"); // Open the file in write mode
global $db;
// Retrieve the JSON payload from the request body
$rec =json_decode(file_get_contents('php://input'));

// Write the contents of the rec object into the file
fwrite($file, print_r($rec, true));

fclose($file); // Close the file

//חילוץ
$_iRecommendId=$rec->iRecommenId;
$_nvName=$rec->nvName;
$_nvJob=$rec->nvJob;
$_Note=$rec->Note;
$_nvPhone=$rec->nvPhone;
$_nvEmail=$rec->nvEmail;

file_put_contents("D:\logs\Enter2.log",print_r($rec, true)); 
file_put_contents("D:\logs\Enter3.log",print_r($rec->iRecommendId, true)); 
file_put_contents("D:\logs\Enter4.log",print_r($_iRecommendId, true)); 



if($_iRecommendId == 0 )
{
  file_put_contents("D:\logs\E.log",print_r($rec, true)); 
// Perform add operation
$sql = 'exec UserRecommends_INS
@nvName=:nvName,
@nvJob=:nvJob,
@Note=:Note,
@nvPhone=:nvPhone,
@nvEmail=:nvEmail,
@iUserId=1,
@iJobsStockId=1';

$add = $db->prepare($sql);

// Set the parameter values
$add->bindParam(':nvName',$_nvName);
$add->bindParam(':nvJob', $_nvJob);
$add->bindParam(':Note',$_Note);
$add->bindParam(':nvPhone',$_nvPhone);
$add->bindParam(':nvEmail',$_nvEmail);

try {
$add->execute();
file_put_contents("D:\logs\Enter3.log",print_r("try_ins", true)); 
echo "Add operation executed successfully";
} catch (PDOException $e) {
echo "Error executing add operation: " . $e->getMessage();
file_put_contents("D:\logs\Enter4.log",print_r("catch_ins", true)); 
}

}

else{
  $sql = 'exec UserRecommends_UPD
  @iRecommenId=:iRecommendId,
  @nvName=:nvName,
  @nvJob=:nvJob,
  @Note=:Note,
  @nvPhone=:nvPhone,
  @nvEmail=:nvEmail,
  @iUserId=1,
  @iJobsStockId=1';

$update = $db->prepare($sql);

// Set the parameter values
$update->bindParam(':iRecommendId', $_iRecommendId);
$update->bindParam(':nvName',$_nvName);
$update->bindParam(':nvJob', $_nvJob);
$update->bindParam(':Note',$_Note);
$update->bindParam(':nvPhone',$_nvPhone);
$update->bindParam(':nvEmail',$_nvEmail);

try {
$update->execute();
file_put_contents("D:\logs\Try.log",print_r("try_upd", true)); 
echo "Update operation executed successfully";
} catch (PDOException $e) {
file_put_contents("D:\logs\Catch.log",print_r("catch_upd", true)); 
echo "Error executing update operation: " . $e->getMessage();
}
}
}
insert_update()
?>