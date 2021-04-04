import {
	SET_USER,
	SET_ERROR,
	CLEAR_ERROR,
	LOADING_UI,
	LOADING_USER,
	SET_UNAUTHENTICATED,
	MARK_NOTIFICATION_READ
} from "./../types";
import axios from "../../axios";

export const signupUser = (newUserData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post("/signup", newUserData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERROR });
			history.push("/");
		})
		.catch((err) => {
			dispatch({
				type: SET_ERROR,
				payload: err.response.data
			});
		});
};
export const loginUser = (userData, history) => async (dispatch) => {
	dispatch({ type: LOADING_UI });
	await axios
		.post("/login", userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			dispatch({
				type: CLEAR_ERROR
			});
			history.push("/");
		})
		.catch((err) => {
			dispatch({
				type: SET_ERROR,
				payload: err.response.data
			});
		});
};

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.get("/user")
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload: res.data
			});
		})
		.catch((err) => console.error(err));
};
export const editUserDetails = (userDetails) => async (dispatch) => {
	dispatch({ type: LOADING_USER });
	await axios
		.post("/user", userDetails)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => {
			console.log(err);
		});
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = (formData) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.post("/user/image", formData)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => {
			console.log(err);
		});
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
	axios
		.post("/notifications", notificationIds)
		.then((res) => {
			dispatch({
				type: MARK_NOTIFICATION_READ
			});
		})
		.catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem("token", FBIdToken);
	axios.defaults.headers.common["Authorization"] = FBIdToken;
};
