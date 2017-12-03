<?php

header('Content-Type: text/json');


require "../../db_conn.php";

$id = $_GET['id'];
$name = $_GET['name'];


try {
    $db->beginTransaction();

    $insert_new_routine = "insert into `routines` (`name`, `id_user`) VALUES ('$name','$id')";

    $db->query($insert_new_routine);

    $db->commit();


} catch (Exception $e) {
    echo $e;
    $db->rollBack();
}

?>