import { SEARCH_PARAMS_WARD } from '../actions/types';

const INITIAL_STATE = {
	resultValuesWard: null
}

export default function(state = INITIAL_STATE, action) {
	// console.log(action);
	switch(action.type) {
		case SEARCH_PARAMS_WARD:
			return {...state, resultValuesWard: action.payload};
		default: 
			return state;
	}
}