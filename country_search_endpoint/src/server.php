<?php

//php -S localhost:8000 server.php
header("Access-Control-Allow-Origin: *");
include 'classes/CountryRequester.php';
$cr = new CountryRequester();

if ($_POST['type'] == "Alpha Code") {
    echo json_encode($cr->QueryByCode($_POST['query']));
} elseif ($_POST['type'] == "Name") {
    echo json_encode($cr->QueryByName($_POST['query']));
} elseif ($_POST['type'] == "Full Name") {
    echo json_encode($cr->QueryByFullName($_POST['query']));
}
 ?>
