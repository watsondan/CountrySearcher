import React, { Component } from 'react';

export default class Country extends Component {


    render() {
        return (
            <li>
                <span>{this.props.name}</span>
                <span>{this.props.alpha2Code}</span>
                <span>{this.props.alpha3Code}</span>
                <img src={this.props.flag} width="125" height="100"></img>
                <span>{this.props.region}</span>
                <span>{this.props.subregion}</span>
                <span>{this.props.population}</span>
                <span>{JSON.stringify(this.props.languages)}</span>
            </li>
        )
    }

}
