<?php
include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();

function loginDetails($Details) {
   
        global $db;
        $result =array();;
        $sql = 'exec LoginDetails 
        @username=:username,
        @password =:password';
        $loginDetails = $db->prepare($sql);
        $username =$Details->username;
        $password=$Details->password;
      
        file_put_contents("D:\logs\Temp.log",print_r("valid data", true) ); 
        $loginDetails->bindParam(':username'      , $username);
        $loginDetails->bindParam(':password'      , $password);
        try {
          $get_details_success =$loginDetails->execute();
              if($get_details_success) {
                while ($row = $loginDetails->fetch(PDO::FETCH_ASSOC)) {
                  array_push(
                    $result,
                    array(
                      'id' => $row['iUserId'],
                      'firstName' => $row['nvFirstName'],
                      'lastName' => $row['nvLastName'],
                      'email' => $row['nvEmail'],
                      'lastLogin' => $row['lastLogin'],
                    )
                  );
                }
              }

        } catch (PDOException $e) {
            file_put_contents("D:\logs\Temp4.log",print_r($e, true) );
        }
    return $result[0];      
}

$Details = json_decode(file_get_contents('php://input'));

$res = loginDetails($Details);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>

