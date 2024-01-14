<?php

function create_good($body)
{
    $connect = pg_connect('host=localhost port=5432 dbname=wil_db user=wil_user password=user');
    pg_insert($connect, 'breed', $body);
    pg_close($connect);
}

function update_good($body)
{
    $id = $body["id"];
    unset($body["id"]);

    $connect = pg_connect('host=localhost port=5432 dbname=wil_db user=wil_user password=user');
    pg_update($connect, 'breed', $body, array("id" => $id));
    pg_close($connect);
}

function delete_good($body)
{
    $id = $body["id"];

    $connect = pg_connect('host=localhost port=5432 dbname=wil_db user=wil_user password=user');
    pg_delete($connect, 'breed', array("id" => $id));
    pg_close($connect);
}