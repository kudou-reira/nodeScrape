import { MODAL_LOGIC } from '../actions/types';

const INITIAL_STATE = {
	value: false
}

export default function(state = INITIAL_STATE, action) {
	// console.log(action);
	switch(action.type) {
		case MODAL_LOGIC:
			return {...state, value: action.payload};
		default: 
			return state;
	}
}