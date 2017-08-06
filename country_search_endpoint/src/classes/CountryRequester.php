<?php

class CountryRequester
{
    private $RESTCOUNTRIES_URL = "https://restcountries.eu/rest/v2";

    public function __construct() {}

    public function Query($query, $queryType) {
        $results;
        switch ($queryType) {
            case "Alpha Code":
                $results = @file_get_contents("$this->RESTCOUNTRIES_URL/alpha/$query");
                break;
            case "Full Name":
                $results = @file_get_contents("$this->RESTCOUNTRIES_URL/name/$query?fullText=true");
                break;
            case "Name":
                $results = @file_get_contents("$this->RESTCOUNTRIES_URL/name/$query");
                break;
            default:
                break;
        }
        return $this->FilterResults(json_decode($results, true));
    }
    // the full name, alpha code 2, alpha code 3, flag image
    // (scaled to fit display), region, subregion, population, and a list of its languages.
    private function FilterResults($results) {
        $fResults = array();
        foreach ($results as $country) {
            $newCountry = array();
            $newCountry['name'] = $country['name'];
            $newCountry['alpha2Code'] = $country['alpha2Code'];
            $newCountry['alpha3Code'] = $country['alpha3Code'];
            $newCountry['flag'] = $country['flag'];
            $newCountry['region'] = $country['region'];
            $newCountry['subregion'] = $country['subregion'];
            $newCountry['population'] = $country['population'];
            $newCountry['languages'] = array();
            foreach ($country['languages'] as $language) {
                array_push($newCountry['languages'], $language['name']);
            }
            array_push($fResults, $newCountry);
        }
        return $fResults;
    }
}
 ?>
