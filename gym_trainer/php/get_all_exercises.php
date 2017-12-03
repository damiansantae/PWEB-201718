<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */

header('Content-Type: text/json');


require "../../db_conn.php";


try {
    $db->beginTransaction();
    $get_exercises = "SELECT * FROM exercises";
    $exercises = $db->query($get_exercises);
    $exercises_data = array();
    while ($row = $exercises->fetch()) {
        $exercises_data[] = array(
            'id' => $row["id"],
            'name' => $row["name"],
            'video_url' => $row["video_url"],
            'description' => $row["description"],
            'image_url' => $row["image_url"]
        );
    }

    echo json_encode($exercises_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>