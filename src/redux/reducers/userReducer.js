import {
	SET_USER,
	LOADING_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LIKE_POST,
	UNLIKE_POST,
	MARK_NOTIFICATION_READ
} from "./../types";

const initialState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: []
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case SET_UNAUTHENTICATED:
			return initialState;

		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case LOADING_USER:
			return {
				...state,
				loading: true
			};
		case LIKE_POST:
			return {
				...state,
				likes: [
					...state.likes,
					{
						username: state.credentials.username,
						postId: action.payload.postId
					}
				]
			};
		case UNLIKE_POST:
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.postId !== action.payload.postId
				)
			};
		case MARK_NOTIFICATION_READ:
			state.notifications.forEach((not) => (not.read = true));
			return {
				...state
			};
		default:
			return state;
	}
};

export default userReducer;
