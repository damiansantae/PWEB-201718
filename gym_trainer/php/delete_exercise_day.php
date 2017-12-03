<?php


header('Content-Type: text/json');


require "../../db_conn.php";
$exercise_day_id = $_GET["exercise_day_id"];

try {
    $db->beginTransaction();
    $delete_exercise = "delete from days_exercises WHERE id=$exercise_day_id";
    $delete = $db->query($delete_exercise);

    echo json_encode($exercise_day_id);



    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>