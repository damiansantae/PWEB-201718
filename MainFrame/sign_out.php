<?php
session_start();
session_destroy();

header('Location:mainFrame.php');
exit();