import React from 'react';
import ReactDOM from 'react-dom';
import CountryList from './CountryList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CountryList />, div);
});
