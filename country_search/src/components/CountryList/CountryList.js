import React, {Component} from 'react';
import QueryStore from './../../stores/QueryStore';
import Country from './../Country/Country';

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
                <p>Data area...</p>
            );
        } else {
            var data = this.state.countryData;
            var arr = [];
            Object.keys(data).forEach(function(key) {
                arr.push(data[key]);
            });
            return (
                <ul>
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
