import {SWITCH_LANGUAGE, UPDATE_NEWS} from "./actions";


const initialState = {
    language: "english",
    imageFolder: "/uploads/images/",
    news: [],
    raw: []
};

function newsReducer(state = initialState, action) {
    let raw = {};
    let language;
    switch (action.type) {

        case UPDATE_NEWS:
            raw = { ...action.payload.data };
            return Object.assign({}, state, {
                raw: raw,
                news: filterRawNewsByLanguage(raw, state.language)
            });
        case SWITCH_LANGUAGE:
            language = action.payload.language.toLowerCase();
            if (action.payload.isFetching){
                return Object.assign({}, state, {
                    language: language
                });
            }
            raw = state.raw;

            return Object.assign({}, state, {
                language: language,
                news: filterRawNewsByLanguage(raw, language)
            });
        default:
            return state;
    }
}

function filterRawNewsByLanguage(raw, language) {
    let newsItemsArray = [];
    raw['hydra:member'].forEach(element =>
        element.language.name.toLowerCase() === language.toLowerCase() ?
            newsItemsArray.push(transformNews(element)) :'');
    return newsItemsArray;
}

function transformNews(rawNews) {
    return {
        title: rawNews.title,
        text: rawNews.text,
        blogImages: rawNews.blogImages
    }
}

export default newsReducer;