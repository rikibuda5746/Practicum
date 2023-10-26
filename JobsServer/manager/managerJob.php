<?php
    include_once("../db.php");
    $conn = new DbConnect();
    $db = $conn->connect();

    function close_open_job($job_stock_id){
        
        global $db;
        $result = '';
        $sql = 'UPDATE JobsStock SET bIsOpen = ~bIsOpen & 1 WHERE iJobsStockId = :job_stock_id';
        $upd_job = $db->prepare($sql);
        $upd_job->bindParam(':job_stock_id', $job_stock_id, PDO::PARAM_INT);
        $upd_job->execute();
        $rowCount = $upd_job->rowCount();
        echo('hello');
        return ($rowCount > 0) ? 'SUCCESS' : 'FAILED';
    }
$job_stock_id = $_GET['job_stock_id'];
$result = close_open_job($job_stock_id);
echo json_encode($result, JSON_UNESCAPED_UNICODE);

//exemp: http://localhost/server/manager/managerJob.php?job_stock_id=5
?>