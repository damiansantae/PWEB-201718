<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */

header('Content-Type: text/json');


require "../../db_conn.php";
$routine_id = $_GET["routine_id"];

try {
    $db->beginTransaction();
    $delete_routines = "delete from routines WHERE id=$routine_id";
    $delete = $db->query($delete_routines);

    echo $delete;


    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>