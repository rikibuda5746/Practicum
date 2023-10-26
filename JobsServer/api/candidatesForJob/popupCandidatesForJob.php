<?php

include_once("../../db.php");
header('Access-Control-Allow-Methods:POST, GET,PUT, DELETE, OPTIONS');
$conn = new DbConnect();
$db = $conn->connect();

function CandidateDetails($userid,$jobsStockId){
        global $db;
        $result = '';
        $sql = "exec candidateDetailsGet @iUserId=:iUserId,@iJobsStockId=:iJobsStockId ";
        $get_user = $db->prepare($sql);
        $get_user->bindParam(':iUserId', $userid);
        $get_user->bindParam(':iJobsStockId', $jobsStockId);
        $get_user_success = $get_user->execute();
        if($get_user_success) {
          $result = array();
          while ($row = $get_user->fetch(PDO::FETCH_ASSOC)) {
            array_push(
              $result,
              array(
                'userId'=> $row ['iUserId'],
                'firstName'=>$row ['nvFirstName'],
                'lastName'=>$row ['nvLastName'],
                'phone'=>$row ['nvPhone'],
                'email'=>$row ['nvEmail'],
                'city'=>$row ['nvCityName'],
                'datePublish'=>$row ['dtDateJobRequest'],
                'experienceYears'=>$row ['experienceYears'],
                'iStatusJobRequestId'=>$row ['iStatusJobRequestId'],
                'sector'=>$row ['nvSectorName'],
                'gender'=>$row ['nvGenderName'],
                'idJobstock'=>$row ['iJobsStockId'],
                'favorite'=>$row ['bIsFavoriteByManager'],
                'recomends'=>$row['concatenateColumns_UserRecommends'],
                'trainings'=>$row['concatenateColumns_UserTraining'],
              ) );}}
        return $result;
      }

    $result = CandidateDetails($_GET['userid'],$_GET['jobsStockId']);
    echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>

