<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 9:00
 */





require "../../db_conn.php";
$id = $_GET['id'];
$id = $db->quote($id);

try{
    $db->beginTransaction();
    $get_routine_id = "SELECT id FROM routines WHERE id_user=$id";
    $routine_id= $db->query($get_routine_id);

    while ($row=$routine_id->fetch()){
        $get_routine_days_id = "SELECT id FROM routines_days WHERE id_routine=$row";

    }

    $db->commit();
}catch (Exception $e)
{
    $db->rollBack();
}




?>