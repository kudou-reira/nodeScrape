import axios from 'axios';
import { FETCH_USER, SEARCH_PARAMS_WARD, MODAL_LOGIC, FIND_CARD } from './types';

//async dispatch is a function
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const searchParamsWard = (ward, roomType, lowPrice, highPrice, lowerRoom, higherRoom, deposit, key, age, distance) => {
	return (dispatch) => {
		axios.get('/api/searchByWard', {
			params: {
				ward,
				roomType,
				lowPrice,
				highPrice,
				lowerRoom,
				higherRoom,
				deposit,
				key,
				age,
				distance
			}
		})
			.then(({ data }) => {
				dispatch({
					type:SEARCH_PARAMS_WARD,
					payload: data
				})
			})
	}
};

export const modalLogic = (value) => {
	return({
		type: MODAL_LOGIC,
		payload: value
	})
};

export const saveCard = (card) => async dispatch => {

	const res = await axios.post('/api/save', {
					params: {
						card
					}
				});

	dispatch({ type: FETCH_USER, payload: res.data });
}

export const deleteCardCollapse = (card) => async dispatch => {

	const res = await axios.post('/api/deleteCollapse', {
					params: {
						card
					}
				});

	dispatch({ type: FETCH_USER, payload: res.data });
}

export const deleteCardModal = (card) => async dispatch => {

	const res = await axios.post('/api/deleteModal', {
					params: {
						card
					}
				});

	dispatch({ type: FETCH_USER, payload: res.data });
}