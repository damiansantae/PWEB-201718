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
    $get_days = "SELECT * FROM routines_days";
    $days = $db->query($get_days);


    $days_data = array();
    while ($row = $days->fetch()) {

        $days_data[] = array(
            'name' => $row["name"],
            'routine_id' => $row["id_routine"],
            'id' => $row["id"]
        );

    }

    echo json_encode($days_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>