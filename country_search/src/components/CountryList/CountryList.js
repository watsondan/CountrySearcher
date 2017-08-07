import React, {Component} from 'react';
import QueryStore from './../../stores/QueryStore';
import Country from './../Country/Country';
import styles from './CountryList.css';

export default class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
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

    HandelNextClick(e) {
        var curPage = this.state.currentPage;
        var totPage = this.state.countryData.data.pages;
        if (curPage < totPage) {
            var nextPage = this.state.currentPage + 1;
            this.setState({currentPage: nextPage});
        }
    }

    HandelPreClick() {
        var curPage = this.state.currentPage;
        if (curPage > 1) {
            var nextPage = this.state.currentPage - 1;
            this.setState({currentPage: nextPage});
        }
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

            var data = this.state.countryData.results[this.state.currentPage];

            return (
                <ul className="Results_List">
                    <li className="Results_List_Header">
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

                        data.map(item =>
                            <Country key={item.alpha3Code} name={item.name} alpha2Code={item.alpha2Code} alpha3Code={item.alpha3Code} flag={item.flag} region={item.region} subregion={item.subregion} population={item.population} languages={item.languages} />
                        )
                    }
                    <li className="Results_List_Footer">
                        <span className="Results_List_Footer_item Results_List_Footer_Pre" onClick={this.HandelPreClick.bind(this)} >Pre</span>
                        <span className="Results_List_Footer_item Results_List_Footer_Count" >Count: {this.state.countryData.data.count}</span>
                        <span className="Results_List_Footer_item Results_List_Footer_Reagions" >Reagions: {JSON.stringify(this.state.countryData.data.regions)}</span>
                        <span className="Results_List_Footer_item Results_List_Footer_Subregion" >Subregions: {JSON.stringify(this.state.countryData.data.subregions)}</span>
                        <span className="Results_List_Footer_item Results_List_Footer_Next" onClick={this.HandelNextClick.bind(this)} >Next</span>
                    </li>
                </ul>
            );
        }
    }
}
