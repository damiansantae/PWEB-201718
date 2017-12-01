<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */

header('Content-Type: text/json');


require "../../db_conn.php";

$exercise_id = $_GET['exercise_id'];
$day_id = $_GET['day_id'];


try {
    $db->beginTransaction();


    $insert_new_exercise_day = "insert into days_exercises (id_exercise, id_day) VALUES ($exercise_id,$day_id)";

    $db->query($insert_new_exercise_day);
    $new_exercise_day = $db->lastInsertId();



    echo $new_exercise_day;
    $db->commit();

} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}

?>