import {FAILED_REQUEST, POST_ANSWER, REQUEST_HUM, RESOLVED_HUM} from "./actions";

function asyncReducer(state = {isFetching: false, isPosting: false}, action) {

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
        case POST_ANSWER:
            return Object.assign({}, state, {
                isPosting: true
            });
        default:
            return state;
    }
}

export default asyncReducer;