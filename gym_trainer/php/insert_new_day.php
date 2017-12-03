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


try {
    $db->beginTransaction();

    $get_days = $db->prepare("select * from routines_days WHERE id_routine=$routine_id");
    $get_days->execute();

    $number_of_days = $get_days->rowCount();

    $number_of_days = $number_of_days +1 ;
    $insert_new_day = "insert into routines_days (name, id_routine) VALUES ($number_of_days,$routine_id)";

    $db->query($insert_new_day);
    $new_day_id = $db->lastInsertId();


    $name[] = array(
        'name' => $number_of_days,
        'id' => $new_day_id,
        'routine_id' => $routine_id
    );


    echo json_encode($name);
    $db->commit();

} catch (Exception $e) {
    $db->rollBack();
}

?>