<?php

function authenticate(&$body)
{
    $login = $body["login"];
    $password = $body["password"];

    $connect = pg_connect('host=localhost port=5432 dbname=wil_db user=wil_user password=user');

    $result = pg_query(
        $connect,
        "SELECT 
            admins.id
        FROM admins 
        WHERE admins.login='$login' AND admins.password='$password';"
    );
    $row = pg_fetch_row($result);
    unset($body['login']);
    unset($body['password']);

    return $row;
}