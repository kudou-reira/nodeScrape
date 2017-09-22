import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import modalReducer from './modalReducer';

export default combineReducers({
	auth: authReducer,
	search: searchReducer,
	modal: modalReducer
});

