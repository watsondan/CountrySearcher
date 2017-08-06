import { EventEmitter } from 'events';

import Dispatcher from './../Dispatcher';

class CountryStore extends EventEmitter {
    constructor() {
        super();
        this.Name = "";
        this.alphaCode2 = "";
        this.alphaCode3 = "";
        this.flagImage = "";
        this.region = "";
        this.subregion = "";
        this.population = "";
        this.languages = [];
    }

    handelActions(action) {
        switch (action.type) {

        }
    }
}
const countryStore = new CountryStore();
Dispatcher.register(countryStore.handelActions.bind(countryStore));
export default countryStore; // Export the const obj, not class.
