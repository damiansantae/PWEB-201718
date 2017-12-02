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
    $get_muscular_groups = "SELECT * FROM muscles";
    $muscular_groups = $db->query($get_muscular_groups);
    $muscular_groups_data = array();
    while ($row = $muscular_groups->fetch()) {
        $muscular_groups_data[] = array(
            'id' => $row["id"],
            'name' => $row["name"],
            'image_url' => $row["image_url"]
        );
    }

    echo json_encode($muscular_groups_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>