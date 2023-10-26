<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();


function delete($iUserId)
{  
    global $db;
    $sql = "exec dbo.UserExperien_DEL :iUserId";
    $delete = $db->prepare($sql);
    $delete->bindParam(':iUserId' ,$iUserId);
  try {
    $delete->execute();
   
  } catch (PDOException $e) {
    echo($e);
  }


}

delete($_GET['iUserId']);
?>



