import React, {Component} from 'react';
import QueryStore from './../../stores/QueryStore';
import Country from './../Country/Country';
import styles from './CountryList.css';

export default class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            query: "",
            queryType: "",
            countryData: null
        }
    }

    componentWillMount() {
        QueryStore.on("change", () => {
            this.queryForData();
        });
    }

    queryForData() {
        const url = 'http://localhost:8000';
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "query=" + QueryStore.getQuery() + "&type=" + QueryStore.getQueryType()
        }
        this.setState({                     // Funtion setState call rerenders Component...
            isLoading: true
        });
        return fetch(url, data)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({                     // Funtion setState call rerenders Component...
                countryData: responseJson,
                isLoading: false
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
              <p>Loading data...</p>
            );
        }
        if (this.state.countryData === null) {
            return (
                <p>No data Availabel. Try new search string.</p>
            );
        } else {
            return (
                <ul className="Results_List">
                    <li className="Results_Header">
                        <span className="Results_List_Header_item Results_List_Header_name" >Name</span>
                        <span className="Results_List_Header_item Results_List_Header_alpha2Code" >Alpha Code 2</span>
                        <span className="Results_List_Header_item Results_List_Header_alpha3Code" >Alpha Code 3</span>
                        <span className="Results_List_Header_item Results_List_Header_flag" >Flag</span>
                        <span className="Results_List_Header_item Results_List_Header_region" >Region</span>
                        <span className="Results_List_Header_item Results_List_Header_subregion" >Subregion</span>
                        <span className="Results_List_Header_item Results_List_Header_population" >Population</span>
                        <span className="Results_List_Header_item Results_List_Header_languages" >Languages</span>
                    </li>
                    {
                        this.state.countryData.map(item =>
                            <Country key={item.alpha3Code} name={item.name} alpha2Code={item.alpha2Code} alpha3Code={item.alpha3Code} flag={item.flag} region={item.region} subregion={item.subregion} population={item.population} languages={item.languages} />
                        )
                    }
                </ul>
            );
        }
    }
}
