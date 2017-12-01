<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */

header('Content-Type: text/json');


require "../../db_conn.php";
$id = $_GET['id'];
$id = $db->quote($id);

try {
    $db->beginTransaction();
    $get_routines = "SELECT * FROM routines WHERE id_user=$id";
    $routines = $db->query($get_routines);


    $routines_data = array();
    while ($row = $routines->fetch()) {

        $routines_data[] = array(
            'name' => $row["name"],
            'id' => $row["id"],
            'days' => array()
        );

    }

    echo json_encode($routines_data);


    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}


?>