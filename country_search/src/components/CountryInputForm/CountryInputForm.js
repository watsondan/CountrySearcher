import React, { Component } from 'react';
import * as ChangeQueryAction from './../../actions/ChangeQueryAction'

export default class CountryInputForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchType: null,
            searchQuery: "",
            buttonDisabled: true
        };
    }

    HandelRadioButtonClick(e) {
        this.setState({
            buttonDisabled: false
        });
        ChangeQueryAction.ChangeQueryType(e.target.value);
    }

    HandelTextBoxChange(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    SearchButtonClick(e) {
        ChangeQueryAction.ChangeQuery(this.state.searchQuery);
    }

    render() {
        return (
            //How do you stop a form form submitting on enter?
            <form>
                <input type='radio' name='qType' value='Alpha Code' onClick={this.HandelRadioButtonClick.bind(this)} /> Alpha Code
                <input type='radio' name='qType' value='Name' onClick={this.HandelRadioButtonClick.bind(this)} /> Name
                <input type='radio' name='qType' value='Full Name' onClick={this.HandelRadioButtonClick.bind(this)} /> Full Name
                <br/>
                <input type='text' placeholder='Country Name, A2 Code or A3 Code:' onChange={this.HandelTextBoxChange.bind(this)} />
                <input type='button' value='Search' onClick={this.SearchButtonClick.bind(this)} disabled={this.state.buttonDisabled} />
            </form>
        );
    }
}
