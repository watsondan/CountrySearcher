<?php

class CountryRequester
{
    private $RESTCOUNTRIES_URL = "https://restcountries.eu/rest/v2";

    public function __construct() {}

    public function Query($query, $queryType) {
        $qString;
        switch ($queryType) {
            case "Alpha Code":
                $qString = "$this->RESTCOUNTRIES_URL/alpha/$query";
                break;
            case "Full Name":
                $qString = "$this->RESTCOUNTRIES_URL/name/$query?fullText=true";
                break;
            case "Name":
                $qString = "$this->RESTCOUNTRIES_URL/name/$query";
                break;
            default:
                break;
        }
        $results = @file_get_contents(str_replace(" ", '%20', $qString));
        $results = json_decode($results, true);

        // if there is only one reuslt, wrap it in an new array.
        if (!array_key_exists(0, $results)) {
            $temp = array();
            array_push($temp, $results);
            $results = $temp;
        }

        return $this->FilterResults($results);
    }

    // the full name, alpha code 2, alpha code 3, flag image
    // (scaled to fit display), region, subregion, population, and a list of its languages.
    private function FilterResults($results) {
        $fResults = array();
        $regions = array();
        $subregions = array();
        foreach ($results as $country) {
            $newCountry = array();
            $newCountry['name'] = $country['name'];
            $newCountry['alpha2Code'] = $country['alpha2Code'];
            $newCountry['alpha3Code'] = $country['alpha3Code'];
            $newCountry['flag'] = $country['flag'];

            if (!array_key_exists($country['region'], $regions)) {
                $regions[$country['region']] = 1;
            } else {
                $regions[$country['region']] += 1;
            }
            $newCountry['region'] = $country['region'];

            if (!array_key_exists($country['subregion'], $subregions)) {
                $subregions[$country['subregion']] = 1;
            } else {
                $subregions[$country['subregion']] += 1;
            }
            $newCountry['subregion'] = $country['subregion'];

            $newCountry['population'] = $country['population'];
            $newCountry['languages'] = array();
            foreach ($country['languages'] as $language) {
                array_push($newCountry['languages'], $language['name']);
            }
            array_push($fResults, $newCountry);
        }

        if (count($fResults, 0) > 1) {
            $sortCols = array();
            foreach($fResults as $country=>$value) {
                $sortCols['name'][$country] = $value['name'];
                $sortCols['population'][$country] = $value['population'];
            }

            array_multisort($sortCols['name'], SORT_ASC, $sortCols['population'], SORT_ASC, $fResults);
        }

        $fResults['result_data']['count'] = count($fResults, 0); // counts top layer of array.
        $fResults['result_data']['regions'] = $regions;
        $fResults['result_data']['subregions'] = $subregions;
        if ($fResults['result_data']['count'] > 50) {
            # code...
        }

        return $fResults;
    }
}
 ?>
