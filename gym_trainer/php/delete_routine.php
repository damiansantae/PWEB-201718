<?php


header('Content-Type: text/json');


require "../../db_conn.php";
$routine_id = $_GET["routine_id"];

try {
    $db->beginTransaction();
    $delete_routines = "delete from routines WHERE id=$routine_id";
    $delete = $db->query($delete_routines);

    echo json_encode($routine_id);



    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>