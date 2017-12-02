<?php


header('Content-Type: text/json');


require "../../db_conn.php";
$day_id = $_GET["day_id"];

try {
    $db->beginTransaction();

    $select_day= "select * from routines_days WHERE id=$day_id";
    $result = $db->query($select_day);

    $row = $result->fetch();
    $array = array(
        'routine_id' => $row['id_routine'],
        'day_id' => $row['id']
    );

    $delete_day = "delete from routines_days WHERE id=$day_id";
    $delete = $db->query($delete_day);




    echo json_encode($array);


    $db->commit();
} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}


?>