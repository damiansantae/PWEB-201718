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
    $get_exercises_id = "SELECT * FROM days_exercises WHERE id_day= $day_id";
    $exercises_id = $db->query($get_exercises_id);

    $exercise_data = array();



    while ($row = $exercises_id->fetch()) {

        $exercise_day_id = $row["id"];
        $exercise_id = $row["id_exercise"];
        $get_exercise = "SELECT * from exercises WHERE  id=$exercise_id";
        $exercise = $db->query($get_exercise);

        while ($row2 = $exercise->fetch()) {
            $exercise_data[] = array(
                'name' => $row2["name"],
                'id' => $row2["id"],
                'image_url' => $row2["image_url"],
                'exercise_day_id' => $exercise_day_id

            );
        }
    }

    echo json_encode($exercise_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>