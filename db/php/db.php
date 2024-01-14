<?php

function get_all_goods()
{
    $connect = pg_connect('host=localhost port=5432 dbname=wil_db user=wil_user password=user');
    $result = pg_query(
        $connect,
        'SELECT 
            Good.id,
            Good.img,
            Good.name,
            Good.label,
            Good.description
            Good.price
            Good.category
            Good.gender
        FROM Good;'
    );
    $array = array();
    while ($row = pg_fetch_row($result)) {
        $entry = new Good($row[0], $row[1], $row[2], $row[3], $row[4]);
        $array[] = $entry;
    }
    pg_close($connect);
    return $array;
}