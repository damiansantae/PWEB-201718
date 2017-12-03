<?php

include '../assets/core/init.php';

if (!empty($_POST)) {

    //check if email address exist
    if (!checkIfEmailTaken($_POST['email_address'])) {
        echo json_encode("email address doesn't exist");
    }

    else{
        if (forgetUserDetails($_POST['email_address'])) {
            echo json_encode("success");
        }
        else {
            echo json_encode("failed");
        }
    }

}