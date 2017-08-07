<?php

//php -S localhost:8000 server.php
header("Access-Control-Allow-Origin: *");
include 'classes/CountryRequester.php';
$cr = new CountryRequester();

$results = $cr->Query($_POST['query'], $_POST['type']);
echo json_encode($results); // To client


// $results = $cr->Query('col', 'Name');
// echo print_r($results);
 ?>
