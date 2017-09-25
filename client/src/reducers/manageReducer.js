import { SAVE_CARD } from '../actions/types';

const INITIAL_STATE = {
	savedCard: null
}

export default function(state = INITIAL_STATE, action) {
	// console.log(action);
	switch(action.type) {
		case SAVE_CARD:
			return {...state, savedCard: action.payload};
		default: 
			return state;
	}
}