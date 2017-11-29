<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 8:32
 */

define("CONNECT_STRING","mysql:host=localhost;dbname=pw_web_app");
define("DATABASE_USER","root");
define ("DATABASE_PASSWD","root");

try{
    $db = new PDO(CONNECT_STRING,DATABASE_USER,DATABASE_PASSWD);
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

}
catch (PDOException $exception){
    die($exception->getMessage());
}

?>