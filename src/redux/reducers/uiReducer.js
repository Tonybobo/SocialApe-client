import {
	SET_ERROR,
	CLEAR_ERROR,
	LOADING_UI,
	STOP_LOADING_UI
} from './../types';

const initialState = {
	loading: false,
	error: null
};

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERROR:
			return {
				...state,
				loading: false,
				error: null
			};
		case LOADING_UI:
			return {
				...state,
				loading: true
			};
		case STOP_LOADING_UI:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};

export default uiReducer;
