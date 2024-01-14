<?php

function getRequestBody()
{
    $rawData = file_get_contents("php://input");
    $jsonData = json_decode($rawData, true);

    return $jsonData;
}