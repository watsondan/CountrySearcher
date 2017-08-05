import React, { Component } from 'react';
import CountryInputForm from './../components/CountryInputForm/CountryInputForm';
import CountryList from './../components/CountryList/CountryList';

export default class CountrySearcher extends Component {



    render() {
        return (
            <div>
                <CountryInputForm />
                <CountryList />
            </div>
        )
    }
}
