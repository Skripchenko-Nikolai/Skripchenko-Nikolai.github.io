<?php

class User
{
    public $id;
    public $login;
    public $password;

    function __construct($id, $login, $npassword)
    {
        $this->id = $id;
        $this->login = $login;
        $this->npassword = $npassword;
    }
}