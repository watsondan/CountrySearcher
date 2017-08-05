import { EventEmitter } from 'events';

import Dispatcher from './../Dispatcher';

class QueryStore extends EventEmitter {
    constructor() {
        super();
        this.query = "";
    }

    getQuery() {
        return this.query;
    }

    setQuery(inQuery) {
        this.query = inQuery;
        this.emit("change");
    }

    handelActions(action) {
        switch (action.type) {
            case "SET_QUERY":
                this.setQuery(action.query);
                break;
            default:
        }
    }
}
const queryStore = new QueryStore();
Dispatcher.register(queryStore.handelActions.bind(queryStore));
export default queryStore; // Export the const obj, not class.
