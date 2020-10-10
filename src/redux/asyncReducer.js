import {
    FAILED_REQUEST,
    POST_ANSWER,
    POST_ANSWER_RESOLVED,
    POST_ANSWER_FAILED,
    REQUEST_HUM,
    RESOLVED_HUM,
    REQUEST_NEWS,
    FAILED_NEWS,
    RESOLVED_NEWS, POST_MESSAGE, POST_MESSAGE_RESOLVED, POST_MESSAGE_FAILED
} from "./actions";

function asyncReducer(state = {
    isFetching: false, 
    isPosting: false,
    sentAnswers: false,
    failedSending: false,
    isFetchingNews: false,
    isPostingMessage: false,
    postingMessageFailed: false,
    postingMessageResolved: false,
}, action) {

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
        case REQUEST_NEWS:
            console.log("Getting news...");
            return Object.assign({}, state, {
                isFetchingNews: true
            });
        case RESOLVED_NEWS:
            console.log("Successfully got news.");
            return Object.assign({}, state, {
                isFetchingNews: false
            });
        case FAILED_NEWS:
            console.log("Unsuccessful request for news.");
            return Object.assign({}, state, {
                isFetchingNews: false
            });
        case POST_ANSWER:
            console.log("Posting answer.");
            return Object.assign({}, state, {
                isPosting: true
            });
        case POST_ANSWER_RESOLVED: 
            console.log("Posting answer finished successfully.");
            return Object.assign({}, state, {
                isPosting: false,
                sentAnswers: true
            });
        case POST_ANSWER_FAILED: 
            console.log("Posting answer failed. Try again later.");
            return Object.assign({}, state, {
                isPosting: false,
                sentAnswers: false,
                failedSending: true
            });
        case POST_MESSAGE:
            console.log("Posting message");
            return Object.assign({}, state, {
                isPostingMessage: true
            });
        case POST_MESSAGE_RESOLVED:
            console.log("Posting message finished successfully.");
            return Object.assign({}, state, {
                isPostingMessage: false,
                postingMessageResolved: true
            });
        case POST_MESSAGE_FAILED:
            console.log("Posting message failed. Try again later.");
            return Object.assign({}, state, {
                isPostingMessage: false,
                postingMessageResolved: false,
                postingMessageFailed: true
            });
        default:
            return state;
    }
}

export default asyncReducer;