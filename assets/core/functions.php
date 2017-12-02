<?php

function get() {
    $db = new mysqli('localhost', 'root', '', 'pwebdb');
    return $db;
}

function checkIfUserNameTaken ($username) {
    $sql = <<<SQL
SELECT COUNT(`id`) as count
FROM `users`
WHERE `username` = '$username'
SQL;

    $result = mysqli_fetch_assoc(get()->query($sql));

    return ($result['count'] == 1 ? true : false);
}

function checkIfEmailTaken ($emailaddress) {
    $sql = <<<SQL
SELECT COUNT(`id`) as count
FROM `users`
WHERE `email_address` = '$emailaddress'
SQL;

    $result = mysqli_fetch_assoc(get()->query($sql));

    return ($result['count'] == 1 ? true : false);
}

function createUserRecord ($userData) {
    array_walk($userData, 'array_sanitize');

    $chosenPassword = $userData['retype_passwordr'];

    if (isset($userData['retype_passwordr'])) {
        unset($userData['retype_passwordr']);
    }

    //$userData['password'] = md5($userData['password']);
    $data = '`' . implode('`, `', array_keys($userData)) . '`';
    $fields= '\''.implode('\',\'',$userData).'\'';

    $sql = <<<SQL
INSERT INTO `users` ($data) VALUES ($fields)
SQL;

    $result = get()->query($sql);

    mail($userData['email_address'],'Successfully Created Account !',"Hello " . $userData['first_name'] . ",\n\nYou have successfully created your online account, here is your login credentials below, please keep them safe:\n\n Username : ".$userData['username']." \n Password : ".$chosenPassword." ",'From: info@jomingeorge.co.uk');

    return ($result ? "SUCCESS" : "FAILED");
}

function getUserIDFromUserName ($username) {
    $sql = <<<SQL
SELECT *
FROM `users` 
WHERE `username` = '$username'
SQL;
    $result = mysqli_fetch_assoc(get()->query($sql));

    return $result['id'];
}

function login ($username, $password) {
    $user_id = getUserIDFromUserName($username);
    //$password = md5($password);

    $sql = <<<SQL
SELECT `id`
FROM `users` 
WHERE `id` = '$user_id'
AND `password` = '$password'

SQL;

    $result = mysqli_fetch_assoc(get()->query($sql));
    return (!empty($result) ? $result['id'] : false);
}

function forgetUserDetails ($email_address) {
    $sql = <<<SQL
SELECT *
FROM `users`
WHERE `email_address` = '$email_address'
SQL;

    $result = mysqli_fetch_assoc(get()->query($sql));

    if (!empty($result)) {
        mail($result['email_address'],'Password Retrieval',"Hello " . $result['first_name'] . ",\n\nYou have recently requested to view your login credentials, please keep them safe:\n\n Username : ".$result['username']." \n Password : ".$result['password']." ",'From: info@jomingeorge.co.uk');
        return true;
    }

    return false;
}

?>