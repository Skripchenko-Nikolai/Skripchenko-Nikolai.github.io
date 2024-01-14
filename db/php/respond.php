<?php
function send_response($object, $response_code = 200)
{
    ob_clean();
    header_remove();
    header("Content-type: application/json; charset=utf-8");
    http_response_code($response_code);
    echo json_encode($object);
}