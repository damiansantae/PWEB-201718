<?php

include '../assets/core/init.php';

if (!empty($_POST)) {

    //check if username exist
    if (!checkIfUserNameTaken($_POST['username'])) {
        echo json_encode("username doesn't exist");
    }

    else{
        $login = login($_POST['username'], $_POST['password']);

        if (!$login) {
            echo json_encode("email address and password combination does not match");
        }
        else {
            $_SESSION['user_id'] = $login;
            echo json_encode("success");
        }
    }

}