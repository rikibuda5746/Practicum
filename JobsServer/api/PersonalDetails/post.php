<?php

 include_once("../../db.php");
 $conn = new DbConnect();
 $db = $conn->connect();

 function set_data() {
  $NewUser = json_decode(file_get_contents('php://input'));
//   file_put_contents("D:\logs\Temp.log",print_r($NewUser, true) ); 
  global $db;
   
   $sql = 'exec Users_INS 
       @nvLastName=:nvLastName,
       @nvFirstName=:nvFirstName,
       @nvIdentity=:nvIdentity,
       @dtBirthDate=:dtBirthDate,
       @nvUserName=:nvUserName,
       @nvPassword=:nvPassword,
       @iCountryId=:iCountryId,
       @iCityId=:iCityId,
       @nvCityName=:nvCityName,
       @nvEmail=:nvEmail,
       @iStreetId=:iStreetId,
       @nvStreetName=:nvStreetName,
       @nvPhone=:nvPhone,
       @iSectorId=:iSectorId,
       @iGenderId=:iGenderId,
       @iFamilyStatusId=:iFamilyStatusId,
       @IsSearchJob=1,
       @bPublic=:bPublic,
       @nvInstitution=:nvInstitution,
       @UserId=:iUserId';
       $set_user = $db->prepare($sql); 
       $firstname=$NewUser->form->FirstName;
       $lastname=$NewUser->form->LastName;
       $streetid=$NewUser->form->StreetId ;
       $streetname=$NewUser->form->StreetName ;
       $pelephon=$NewUser->form->Pelephone;
       $password=$NewUser->passwordProps;
       $borndate=$NewUser->form->BornDate;
       $country=$NewUser->form->CountrySource;
       $city=$NewUser->form->CityId ;
       $cityname=$NewUser->form->CityName;
       $sector=$NewUser->form->Sector;
       $gender=$NewUser->form->Gender;
       $satatus=$NewUser->form->MaritalStatus;
       $user=$NewUser->userNameProps;
       $public=$NewUser->form->IsPublic;
       $email=$NewUser->form->Email;
       $identity=$NewUser->form->Id;
       $iUserId=$NewUser->IdUser;
     
       $set_user->bindParam(':nvLastName'      , $lastname);
       $set_user->bindParam(':nvFirstName'     , $firstname);
       $set_user->bindParam(':nvIdentity'      , $identity);
       $set_user->bindParam(':dtBirthDate'     , $borndate);
       $set_user->bindParam(':nvUserName'      , $user);
       $set_user->bindParam(':nvPassword'      , $password);
       $set_user->bindParam(':iCountryId'      , $country);
       $set_user->bindParam(':iCityId'         , $city);
       $set_user->bindParam(':nvCityName'      , $cityname);
       $set_user->bindParam(':nvEmail'         , $email);
       $set_user->bindParam(':iStreetId'       , $streetid);
       $set_user->bindParam(':nvStreetName'    , $streetname);
       $set_user->bindParam(':nvPhone'         , $pelephon);
       $set_user->bindParam(':iSectorId'       , $sector);
       $set_user->bindParam(':iGenderId'       , $gender);
       $set_user->bindParam(':iFamilyStatusId' , $satatus);
       $set_user->bindParam(':bPublic'         , $public);
       $set_user->bindParam(':nvInstitution'   , $lastname);   
       $set_user->bindParam(':iUserId'         , $iUserId);      

       try {
           $set_user->execute();
        //    file_put_contents("D:\logs\Temp3.log",print_r("Succses", true) );
       } catch (PDOException $e) {
        //    file_put_contents("D:\logs\Temp4.log",print_r($e, true) );
       }
       
}
set_data();
?>
