<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
/**
* Database Connection
*/
class DbConnect {
  private $server = 'w2030-demo.cdteo2iynple.eu-west-1.rds.amazonaws.com';
  private $dbname = 'Jobs';
  private $user = 'JobUser';
  private $pass = 'W2030p123';
  public function connect() {
    try {
      $db = new PDO("sqlsrv:Server={$this->server};Database={$this->dbname}", $this->user, $this->pass);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $db->setAttribute(PDO::SQLSRV_ATTR_ENCODING, PDO::SQLSRV_ENCODING_UTF8);
      // echo "connect";
      ini_set('display_errors', 0);
      error_reporting(E_ERROR | E_WARNING | E_PARSE);
      return $db;
    } catch (PDOException $e) {
      echo "Error! " . $e->getMessage();
      exit;
    }


  }
}
?>