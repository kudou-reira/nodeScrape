import { SEARCH_PARAMS_WARD } from '../actions/types';

const INITIAL_STATE = {
	searchValuesWard: []
}

export default function(state = INITIAL_STATE, action) {
	// console.log(action);
	switch(action.type) {
		case SEARCH_PARAMS_WARD:
			return {...state, searchValuesWard: action.payload};
		default: 
			return state;
	}
}