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
export const RESOLVED_NEWS = "RESOLVED_NEWS";
export const REQUEST_NEWS = "REQUEST_NEWS";
export const FAILED_NEWS = "FAILED_NEWS";
export const UPDATE_NEWS = "UPDATE_NEWS";
export const OPEN_NEWS = "OPEN_NEWS";
export const CLOSE_NEWS = "CLOSE_NEWS";
export const POST_ANSWER = "POST_ANSWER";
export const POST_ANSWER_RESOLVED = "POST_ANSWER_RESOLVED";
export const POST_ANSWER_FAILED = "POST_ANSWER_FAILED";
export const POST_MESSAGE = "POST_MESSAGE";
export const POST_MESSAGE_RESOLVED = "POST_MESSAGE_RESOLVED";
export const POST_MESSAGE_FAILED = "POST_MESSAGE_FAILED";
export const UPDATE_PAGE = "UPDATE_PAGE";


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
});

export const postMessage = (message, isSigningUp) => {

    return function (dispatch) {
        dispatch(postRequestMessage());

        axios({
            method: 'post',
            url: process.env.REACT_APP_TARGET + '/contact',
            data: {
                email: message.email,
                name: message.name,
                message: message.text
            }
        })
            .then(response => {
                dispatch(postMessageResolved(isSigningUp));
            })
            .catch(error => {
                console.error(error);
                dispatch(postMessageFailed());
            });
    }
}

export const postRequestMessage = () => {
    return {
        type: POST_MESSAGE
    }
}
export const postMessageResolved = (isSigningUp) => {

    return {
        type: POST_MESSAGE_RESOLVED,
        isSigningUp: isSigningUp
    }
}

export const postMessageFailed = () => {
    return {
        type: POST_MESSAGE_FAILED
    }
}

export const postAnswer = (answer, humId) => {

    return function (dispatch) {
        dispatch(postRequestAnswer());

        let axiosArray = [];
        answer.answers.forEach(element => {
            let answer = Object.values(element)[0];
            answer = typeof answer === 'number' ? answer.toString() : answer;
            
            let newPromise = axios({
                method: 'post',
                url: process.env.REACT_APP_TARGET + '/api/client_answers',
                data: {
                    hum: humId.toString(),
                    idHash: new Date(Date.now()).toDateString(),
                    question: Object.keys(element)[0],
                    answer: answer
                }
            });
            axiosArray.push(newPromise);
            
        });

        axios.all(axiosArray).then(axios.spread((...responses) => {
            dispatch(postResolvedPostAnswer());
        })).catch(errors => {
            console.log(errors);
            dispatch(postFailedPostAnswer());
        })
    }
}

export const postRequestAnswer = () => {
    return {
        type: POST_ANSWER
    }
}

export const postResolvedPostAnswer = () => {
    return {
        type: POST_ANSWER_RESOLVED
    }
}

export const postFailedPostAnswer = () => {
    return {
        type: POST_ANSWER_FAILED
    }
}

export const getNews = () => {

    return function (dispatch) {
        dispatch(requestNews());
        return axios.get(process.env.REACT_APP_TARGET + '/api/blog_posts?page=1')
            .then(response => {
                dispatch(resolvedGetNews());
                dispatch(updateNews(response.data));
            })
            .catch(function (error) {
                dispatch(failedNewsRequest());
                console.log(error);
            })

    }
}
export const requestNews = () => {
    return {
        type: REQUEST_NEWS
    }
}

export const failedNewsRequest = () => {
    return {
        type: FAILED_NEWS
    }
}

export const resolvedGetNews = () => {
    return {
        type: RESOLVED_NEWS,
    }
}

export const updateNews = (data) => {
    return {
        type: UPDATE_NEWS,
        payload: {
            data: data
        }
    }
}

export const openNews = (news) => {
    return {
        type: OPEN_NEWS,
        payload: {
            news: news
        }
    }
}

export const closeNews = () => {
    return {
        type: CLOSE_NEWS,
    }
}

export const getHum = () => {

    return function (dispatch) {
        dispatch(requestHum());
        return axios.get(process.env.REACT_APP_TARGET + '/api/hums?page=1')
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

export const switchLanguage = (language, isFetching) => {
    return {
        type: SWITCH_LANGUAGE,
        payload: {
            language: language,
            isFetching: isFetching
        }
    }
}

export const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        payload: {
            page: page
        }
    }
}