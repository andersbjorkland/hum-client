import {FAILED_REQUEST, REQUEST_HUM, RESOLVED_HUM} from "./actions";

function asyncReducer(state = {isFetching: false}, action) {

    switch (action.type) {
        case REQUEST_HUM:
            console.log("Getting hum...");
            return Object.assign({}, state, {
                isFetching: true
            });
        case RESOLVED_HUM:
            console.log("Successfully got hum.");
            return Object.assign({}, state, {
                isFetching: false
            });
        case FAILED_REQUEST:
            console.log("Unsuccessful request.");
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}

export default asyncReducer;