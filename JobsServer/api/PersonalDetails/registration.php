<?php

include_once("../../db.php");
$conn = new DbConnect();
$db = $conn->connect();


function get_UserId($UserId){
  global $db;
  $result = '';
  $sql = 'exec Users_Upd 
	@iUserId=:iUserId';
  $get_user = $db->prepare($sql);
  $get_user->bindParam(':iUserId', $UserId);
  $get_user_success = $get_user->execute();
  if($get_user_success) {
    $result = array();
    while ($row = $get_user->fetch(PDO::FETCH_ASSOC)) {
      array_push(
        $result,
        array(
          'FirstName' => $row['nvFirstName'],
          'LastName'=>$row['nvLastName'],
          'Id' => $row['nvIdentity'],
          'Email'=>$row['nvEmail'],
          'Pelephone' => $row['nvPhone'],
          'StreetId'=>$row['iStreetId'],
          'StreetName' => $row['nvStreetName'],
          'BornDate'=>$row['dtBirthDate'],
          'Sector' => $row['iSectorId'],
          'CountrySource'=>$row['iSourceCountryId'],
          'MaritalStatus'=>$row['iFamilyStatusId'],
          'Gender' => $row['iGenderId'],
          'IsPublic'=>$row['bPublic'],
          'CityId' => $row['iCityId'],
          'CityName'=>$row['nvCityName'],
        )
      );
    }  }
    return $result[0];
}



$func = $_GET['func'];
$get = file_get_contents('php://input') ?? $_GET;
$get = json_decode($get, true);

$func = $_GET['func'];
switch ($func) {

    case '"get_UserId"':
      $result = get_UserId($_GET['user_id']);
      break;
}


echo json_encode($result, JSON_UNESCAPED_UNICODE);

//http://localhost\server\api\users\get.php?func="get_sector_options"
//http://localhost\server\api\users\get.php?func="get_gender_options"
//http://localhost\server\api\users\get.php?func="get_statusFamily_options"
//http://localhost\server\api\users\get.php?func="get_countrySource_options"
//http://localhost\server\api\users\get.php?func="get_UserId"
?>