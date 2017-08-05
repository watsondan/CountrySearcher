import React, { Component } from 'react';

export default class CountryInputForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <form>
                <input type='text' placeholder='Country Name, A2 Code or A3 Code:'/>
            </form>
        );
    }
}
