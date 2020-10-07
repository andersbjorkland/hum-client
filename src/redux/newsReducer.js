import {CLOSE_NEWS, OPEN_NEWS, SWITCH_LANGUAGE, UPDATE_NEWS} from "./actions";


const initialState = {
    language: "english",
    imageFolder: "/uploads/images/",
    showNewsItem: false,
    newsItem: {},
    newsItemObject: {},
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

            let filteredNews = null;
            if (state.showNewsItem) {
                if (state.newsItemObject.blogPosts.length > 0) {
                    for (const newsElement of state.newsItemObject.blogPosts) {
                        if (newsElement.language.name.toLowerCase() === language) {
                            filteredNews = transformNews(newsElement);
                            break;
                        }
                    }
                }else if (null !== state.newsItem.parent) {
                    console.log(state.newsItem.parent)
                    let parent = state.raw["hydra:member"].filter(element => element["@id"] === state.newsItem.parent);
                    if (null !== parent) {
                        parent = parent[0];
                        filteredNews = transformNews(parent);
                    }
                }
            }

            filteredNews = null === filteredNews ? state.newsItem : filteredNews;

            raw = state.raw;
            console.log(state);

            return Object.assign({}, state, {
                language: language,
                news: filterRawNewsByLanguage(raw, language),
                newsItem: filteredNews,
                newsItemObject: filteredNews.raw
            });
        case OPEN_NEWS:
            return Object.assign({}, state, {
                showNewsItem: true,
                newsItem: action.payload.news,
                newsItemObject: action.payload.news.raw
            });
        case CLOSE_NEWS:
            return Object.assign({}, state, {
                showNewsItem: false,
                newsItem: {}
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
    let parent = null;
    if (null !== rawNews.parent) {
        parent = rawNews.parent;
    }
    return {
        id: rawNews.id,
        title: rawNews.title,
        text: rawNews.text,
        blogImages: rawNews.blogImages,
        parent: parent,
        raw: rawNews
    }
}

export default newsReducer;