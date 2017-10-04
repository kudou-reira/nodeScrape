import { SEARCH_PARAMS_WARD, NULL_VALUE } from '../actions/types';

const INITIAL_STATE = {
	resultValuesWard: null
}

export default function(state = INITIAL_STATE, action) {
	// console.log(action);
	switch(action.type) {
		case SEARCH_PARAMS_WARD:
			return {...state, resultValuesWard: action.payload};
		case NULL_VALUE:
			return {...state, resultValuesWard: null}
		default: 
			return state;
	}
}