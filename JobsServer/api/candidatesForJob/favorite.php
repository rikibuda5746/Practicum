<?php

include_once("../../db.php");

$conn = new DbConnect();
$db = $conn->connect();

function JobRequest_Favorite_UPD()
{  
  $data = json_decode(file_get_contents('php://input'));

   global $db;
    $sql = "exec dbo.JobRequest_Favorite_UPD @iJobsStockId=:iJobsStockId ,@iUserId=:iUserId ,@bIsFavoriteByManager=:bIsFavoriteByManager";
   $updateFavorite = $db->prepare($sql);
   $favoriteChange= $data->favoriteChange;
   $userId=$data->userId;
   $idJobstock=$data->idJobstock;

   $updateFavorite->bindParam(':iJobsStockId', $idJobstock);
   $updateFavorite->bindParam(':iUserId', $userId);
   $updateFavorite->bindParam(':bIsFavoriteByManager', $favoriteChange);
   $updateFavorite->execute();
}

JobRequest_Favorite_UPD();
?>


