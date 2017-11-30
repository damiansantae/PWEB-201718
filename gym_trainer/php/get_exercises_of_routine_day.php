<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */

header('Content-Type: text/json');


require "../../db_conn.php";
$routine_id = $_GET['routine_id'];
$day_id = $_GET['day_id'];
$routine_id = $db->quote($routine_id);
$day_id = $day_id->quote($day_id);

try {
    $db->beginTransaction();
    $get_exercises_id = "SELECT id_exercise FROM days_exercises WHERE id_day= $day_id";
    $exercises_id = $db->query($get_exercises_id);

    $exercise_data = array();
    while ($row = $exercises_id->fetch()) {
        $get_exercise = "SELECT * from exercises WHERE  id=$row";
        $exercise = $db->query($get_exercise);

        while ($row2 = $exercise->fetch()) {
            $exercise_data[] = array(
                'name' => $row2["name"],
                'id' => $row2["id"],
                'video_url' => $row2["video_url"],
                'description' => $row2["description"],
                'image_url' => $row2["image_url"]
            );
        }
    }




    echo json_encode($exercise_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>