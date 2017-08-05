<?php

//php -S localhost:8000 server.php
header("Access-Control-Allow-Origin: *");
include 'classes/CountryRequester.php';
$cr = new CountryRequester();

echo json_encode($cr->QueryByName($_POST['query']), JSON_PRETTY_PRINT);
// echo "By name: \n";
// echo json_encode($cr->QueryByName('colom'), JSON_PRETTY_PRINT);
// echo "\nBy full name: \n";
// echo json_encode($cr->QueryByFullName('Colombia'), JSON_PRETTY_PRINT);
// echo "\nBy alpha2 code: \n";
// echo json_encode($cr->QueryByCode('CO'), JSON_PRETTY_PRINT);
// echo "\nBy alpha3 code: \n";
// echo json_encode($cr->QueryByCode('COL'), JSON_PRETTY_PRINT);
// echo "\n\n";
 ?>
