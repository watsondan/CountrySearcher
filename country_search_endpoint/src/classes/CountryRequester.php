<?php

class CountryRequester
{
    private $RESTCOUNTRIES_URL = "https://restcountries.eu/rest/v2";

    public function __construct() {}

    public function QueryByName($name) {
        return json_decode(@file_get_contents("$this->RESTCOUNTRIES_URL/name/$name"));
    }

    public function QueryByFullName($name) {
        return json_decode(@file_get_contents("$this->RESTCOUNTRIES_URL/name/$name?fullText=true"));
    }

    public function QueryByCode($code) {
        return json_decode(@file_get_contents("$this->RESTCOUNTRIES_URL/alpha/$code"));
    }
}
 ?>
