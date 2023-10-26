<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();


function delete_recomend($iRecommenId)
{  
    global $db;
    $sql = "exec dbo.UserRecommends_DEL :iRecommenId";
    $delete = $db->prepare($sql);
    $delete->bindParam(':iRecommenId' ,$iRecommenId);
  try {
    $delete->execute();
   
  } catch (PDOException $e) {
    echo($e);
  }

}
$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$result = delete_recomend($_GET['iRecommenId']);


echo json_encode($result, JSON_UNESCAPED_UNICODE);

// exemp: http://localhost/server/api/Recomend/deleteRecommend.php?iRecommenId=209

?>