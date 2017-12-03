<?php
function get() {
    $db = new mysqli('localhost', 'root', 'root', 'pw_web_app');
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

    mail($userData['email_address'],'Cuenta creada con exito',"Hello " . $userData['first_name'] . ",\n\nAqui estan tus credenciales:\n\n Usuario : ".$userData['username']." \n Contrasena : ".$chosenPassword." ",'From: tafiradesarrolladores@tafira.es');
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
        mail($result['email_address'],'Recuperar contrasena',"Hello " . $result['first_name'] . ",\n\nHas pedido ver tus credenciales de nuevo\n\n Usuario : ".$result['username']." \n Contrasena : ".$result['password']." ",'From: tafiradesarrolladores@tafira.es');
        return true;
    }

    return false;
}



?>