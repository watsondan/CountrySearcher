import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import CountryInputForm from './CountryInputForm/CountryInputForm';
import CountryList from './CountryList/CountryList';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <CountryInputForm />
        <CountryList />
    </div>,
    document.getElementById('root')
);

registerServiceWorker();
