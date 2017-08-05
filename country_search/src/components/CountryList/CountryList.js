import React, {Component} from 'react';

export default class CountryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        }
    }

    componentDidMount() {
        const url = 'http://localhost:8000';
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "query=col"
        }

        return fetch(url, data)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({                     // Funtion setState call rerenders Component...
                isLoading: false,
                countryData: responseJson
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
              <p>Waiting for data!</p>
            );
        }
        return (
            <p>{JSON.stringify(this.state.countryData)}</p>
        );
    }
}
