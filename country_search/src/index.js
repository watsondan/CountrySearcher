import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CountrySearcher from './pages/CountrySearcher'
ReactDOM.render(
    <CountrySearcher />,
    document.getElementById('root')
);

registerServiceWorker();
