// reducers/index.js
import { combineReducers } from 'redux';
import cardReducer from './cardReducer'; // Create cardReducer later

const rootReducer = combineReducers({
    cards: cardReducer
});

export default rootReducer;
