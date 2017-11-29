<?php
/**
 * Created by PhpStorm.
 * User: Damian
 * Date: 29/11/2017
 * Time: 8:32
 */

define("DATABASE_LOCAL","localhost");
define("DATABASE_NAME","pw_web_app");
define("DATABASE_USER","root");
define ("DATABASE_PASSWD","root");

$db = new mysqli(DATABASE_LOCAL,DATABASE_USER,DATABASE_PASSWD,DATABASE_NAME);


?>