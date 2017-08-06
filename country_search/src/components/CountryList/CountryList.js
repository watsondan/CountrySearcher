import React, {Component} from 'react';
import QueryStore from './../../stores/QueryStore'

export default class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            query: "",
            queryType: ""
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
        return (
            <p>{JSON.stringify(this.state.countryData)}</p>
        );
    }
}
