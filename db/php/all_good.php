<?php

require '../http/respond.php';
require '../db/db.php';

$id = $_GET["id"];
$goods = get_all_goods($id);

send_response($goods);