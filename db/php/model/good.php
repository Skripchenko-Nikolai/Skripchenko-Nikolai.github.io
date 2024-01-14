<?php

class Breed
{
    public $id;
    public $img;
    public $name;
    public $label;
    public $description;
    public $price;
    public $category;
    public $gender;

    function __construct($id, $img, $name, $label, $description, $price, $category, $gender)
    {
        $this->id = $id;
        $this->img = $img;
        $this->name = $name;
        $this->label = $label;
        $this->description = $description;
        $this->price = $price;
        $this->category = $category;
        $this->gender = $gender;
    }
}