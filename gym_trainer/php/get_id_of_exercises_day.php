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
    $get_exercises_id = "SELECT id FROM days_exercises WHERE id_day= $day_id";
    $exercises_id = $db->query($get_exercises_id);

    $exercises_id_array = array();
    while ($row = $exercises_id->fetch()) {


        $exercises_id_array[] = array(

                'id' => $row["id"]
        );

    }

    echo json_encode($exercises_id_array);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>