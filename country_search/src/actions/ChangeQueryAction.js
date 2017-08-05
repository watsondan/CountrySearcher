import Dispatcher from './../Dispatcher';

export function ChangeQuery(query) {
    Dispatcher.dispatch({
        type: "SET_QUERY",
        query,
    });
}
