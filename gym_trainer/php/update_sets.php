<?php


header('Content-Type: text/json');


require "../../db_conn.php";
$exercise_day_id = $_GET["exercise_day_id"];
$value = $_GET["value"];


try {
    $db->beginTransaction();
    $update_sets = "UPDATE days_exercises set sets=$value WHERE id=$exercise_day_id";
    $update = $db->query($update_sets);

    echo json_encode($exercise_day_id);



    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>