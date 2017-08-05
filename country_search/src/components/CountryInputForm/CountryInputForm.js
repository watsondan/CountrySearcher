import React, { Component } from 'react';

export default class CountryInputForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    HandelChange(e) {
        const searchString = e.target.value;
        this.props.updateList();
    }

    render() {
        return (
            <form>
                <input type='text' placeholder='Country Name, A2 Code or A3 Code:' onChange={this.HandelChange.bind(this)} />
            </form>
        );
    }
}
