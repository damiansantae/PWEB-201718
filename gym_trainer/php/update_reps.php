<?php


header('Content-Type: text/json');


require "../../db_conn.php";
$exercise_day_id = $_GET["exercise_day_id"];
$value = $_GET["value"];


try {
    $db->beginTransaction();
    $update_reps = "UPDATE days_exercises set reps=$value WHERE id=$exercise_day_id";
    $update = $db->query($update_reps);

    echo json_encode($update);


    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>