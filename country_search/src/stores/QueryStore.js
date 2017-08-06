import { EventEmitter } from 'events';

import Dispatcher from './../Dispatcher';

class QueryStore extends EventEmitter {
    constructor() {
        super();
        this.query = "";
        this.queryType = "";
    }

    getQuery() {
        return this.query;
    }

    getQueryType() {
        return this.queryType;
    }

    setQuery(inQuery) {
        this.query = inQuery;
        this.emit("change");
    }

    setQueryType(inType) {
        this.queryType = inType;
    }

    handelActions(action) {
        switch (action.type) {
            case "SET_QUERY":
                this.setQuery(action.query);
                break;
            case "SET_QUERY_TYPE":
                this.setQueryType(action.qtype);
                break;
            default:
        }
    }
}
const queryStore = new QueryStore();
Dispatcher.register(queryStore.handelActions.bind(queryStore));
export default queryStore; // Export the const obj, not class.
