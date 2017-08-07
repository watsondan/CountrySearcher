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

        $results_data = array();

        $results_data['results'] = $fResults;

        $results_data['data']['count'] = count($fResults, 0); // counts top layer of array.
        $results_data['data']['regions'] = $regions;
        $results_data['data']['subregions'] = $subregions;
        if ($results_data['result_data']['count'] > 50) {
            $pages = ceil($results_data['result_data']['count'] / 50);
            
        }

        return $results_data;
    }
}
 ?>
