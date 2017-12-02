<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */

header('Content-Type: text/json');


require "../../db_conn.php";
$day_id = $_GET['day_id'];

try {
    $db->beginTransaction();

    $get_day_exercises= "SELECT * FROM days_exercises WHERE id_day= $day_id";
    $day_exercises = $db->query($get_day_exercises);

    $response = array();


    while ($row = $day_exercises->fetch()) {


        $response[] = array(

            'day_exercise_id' => $row["id"],
            'rep_value' => $row["reps"],
            'set_value' => $row["sets"]
        );

    }

    echo json_encode($response);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}

