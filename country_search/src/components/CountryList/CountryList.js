import React, {Component} from 'react';
import QueryStore from './../../stores/QueryStore'

export default class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          query: QueryStore.getQuery(),
        }
    }

    componentWillMount() {
        QueryStore.on("change", () => {
            this.setState({
                query: QueryStore.getQuery(),
            });
            this.queryForData();
        });
    }

    componentDidMount() {

    }

    queryForData() {
        const url = 'http://localhost:8000';
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "query=" + this.state.query
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
            this.setState({                     // Funtion setState call rerenders Component...
                isLoading: false
            });
            console.error(error);
        });
    }

    render() {
        if (this.state.query === "") {
            return (
              <p>Type to start searching...</p>
            );
        }
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
