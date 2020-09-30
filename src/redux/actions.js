import axios from 'axios';

// Your actions and action constants here

// Action constants can be defined like this:
// export const AN_ACTION = "AN_ACTION";
export const ANSWERING = "ANSWERING";
export const INVALID = "INVALID";
export const UNINVALIDATE = "UNINVALIDATE";
export const RESOLVED_HUM = "RESOLVED_HUM";
export const REQUEST_HUM = "REQUEST_HUM";
export const FAILED_REQUEST = "FAILED_REQUEST";
export const UPDATE_CONTENT = "UPDATE_CONTENT";
export const SWITCH_LANGUAGE = "SWITCH_LANGUAGE";
export const POST_ANSWER = "POST_ANSWER";
export const POST_ANSWER_RESOLVED = "POST_ANSWER_RESOLVED";
export const POST_ANSWER_FAILED = "POST_ANSWER_FAILED";


// Actions should have a basic structure like this, optionally with some payload for "someData":
// export const basicAction = someData => ({
//     type: AN_ACTION,
//     payload: {
//         data: someData
//     }
// });

export const answerAction = (event, data) => ({
    type: ANSWERING,
    payload: {
        event: event,
        data: data
    }
});

export const answerInvalid = (componentId) => ({
    type: INVALID,
    payload: {
        componentId: componentId
    }
});

export const answerUninvalid = (componentId) => ({
    type: UNINVALIDATE,
    payload: {
        componentId: componentId
    }
})

export const postAnswer = answer => {
    console.log(answer);
    return {
        type: POST_ANSWER
    }
}

export const getHum = () => {

    return function (dispatch) {
        dispatch(requestHum());
        return axios.get('https://localhost:8000/api/hums?page=1')
            .then(response => {
                dispatch(resolvedGetHum());
                dispatch(updateContent(response.data));
            })
            .catch(function (error) {
                dispatch(failedRequest());
                console.log(error);
            })
            .then();

    }
}

export const requestHum = () => {
    return {
        type: REQUEST_HUM
    }
}

export const failedRequest = () => {
    return {
        type: FAILED_REQUEST
    }
}

export const resolvedGetHum = () => {
    return {
        type: RESOLVED_HUM,
    }
}

export const updateContent = (data) => {
    return {
        type: UPDATE_CONTENT,
        payload: {
            data: data
        }
    }
}

export const switchLanguage = language => {
    return {
        type: SWITCH_LANGUAGE,
        payload: {
            language: language
        }
    }
}