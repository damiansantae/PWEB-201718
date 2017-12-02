<?php


header('Content-Type: text/json');


require "../../db_conn.php";
$day_id = $_GET["day_id"];

try {
    $db->beginTransaction();
    $delete_day = "delete from routines_days WHERE id=$day_id";
    $delete = $db->query($delete_day);

    echo json_encode($delete);


    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>