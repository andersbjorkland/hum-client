import { combineReducers } from 'redux';
import contentReducer from './contentReducer';
import asyncReducer from "./asyncReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
    contentReducer,
    newsReducer,
    asyncReducer
});