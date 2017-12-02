<?php

include '../assets/core/init.php';

if (!empty($_POST)) {

    //check if username is taken
    if (checkIfUserNameTaken($_POST['username'])) {
        echo json_encode("username taken");
    }

    //check if email address is taken
    else if (checkIfEmailTaken($_POST['email_address'])) {
        echo json_encode("email taken");
    }

    //check if passwords are the same
    else if ($_POST['password'] != $_POST['retype_passwordr']) {
        echo json_encode("passwords not same");
    }

    else {
        //creating the user record into the database
        $userRegistration = createUserRecord($_POST);

        //checking if successfully created the record
        if ($userRegistration == "SUCCESS") {
            echo json_encode("successfully created");
        }

        //checking if there was any issue while creating the record to the database
        else if ($userRegistration == "FAILED") {
            echo json_encode("failed to created");
        }
    }

}

