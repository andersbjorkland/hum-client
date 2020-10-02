import {SWITCH_LANGUAGE, UPDATE_NEWS} from "./actions";


const initialState = {
    imageFolder: "/uploads/images/",
    news: [],
    raw: []
};

function newsReducer(state = initialState, action) {
    let newsItems = [];
    switch (action.type) {

        case UPDATE_NEWS:
            console.log(action.payload.data);
            let raw = { ...action.payload.data };
            raw['hydra:member'].forEach(element => newsItems.push(transformNews(element)));
            return Object.assign({}, state, {
                raw: raw,
                news: newsItems
            });
        case SWITCH_LANGUAGE:
            let language = action.payload.language.toLowerCase();
            console.log("newsReducer is also listening: " + language);

            return state;
        default:
            return state;
    }
}

function transformNews(rawNews) {
    return {
        title: rawNews.title,
        text: rawNews.text,
    }
}

export default newsReducer;