import Dispatcher from './../Dispatcher';

export function ChangeQuery(query) {
    Dispatcher.dispatch({
        type: "SET_QUERY",
        query,
    });
}

export function ChangeQueryType(qtype) {
    Dispatcher.dispatch({
        type: "SET_QUERY_TYPE",
        qtype,
    });
}
