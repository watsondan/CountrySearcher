import React, { Component } from 'react';
import * as ChangeQueryAction from './../../actions/ChangeQueryAction'

export default class CountryInputForm extends Component {

    componentDidMount() {

    }

    HandelChange(e) {
        ChangeQueryAction.ChangeQuery(e.target.value);
    }

    render() {
        return (
            <form>
                <input type='text' placeholder='Country Name, A2 Code or A3 Code:' onChange={this.HandelChange.bind(this)} />
            </form>
        );
    }
}
