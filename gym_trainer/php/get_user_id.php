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

   $user_id = $_SESSION['user_id'];
json_encode($user_id);
    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
}