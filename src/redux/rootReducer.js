import { combineReducers } from 'redux';
import contentReducer from './contentReducer';
import asyncReducer from "./asyncReducer";

export default combineReducers({
    contentReducer,
    asyncReducer
    // add any number of reducers that you have
});