import React, { Component } from 'react';

export default class Country extends Component {


    render() {
        return (
            <li>
                <span>Name: {this.props.name}, </span>
                <span>Alpha 2: {this.props.alpha2Code}, </span>
                <span>Alpha 3: {this.props.alpha3Code}, </span>
                <img src={this.props.flag} alt="Flag of {this.props.name}" width="125" height="100"></img>
                <span>Region: {this.props.region}, </span>
                <span>Subregion: {this.props.subregion}, </span>
                <span>Population: {this.props.population}, </span>
                <span>Languages: {JSON.stringify(this.props.languages)}</span>
            </li>
        )
    }

}
