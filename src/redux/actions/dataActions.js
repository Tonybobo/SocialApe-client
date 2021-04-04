import {
	SET_POSTS,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	CREATE_POST,
	LOADING_UI,
	CLEAR_ERROR,
	SET_ERROR,
	STOP_LOADING_UI,
	SET_POST,
	SUMMIT_COMMENT
} from '../types';
import axios from '../../axios';

export const createPost = (body) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/post', body)
		.then((res) => {
			dispatch({
				type: CREATE_POST,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERROR,
				payload: err.response.data
			});
		});
};

export const getOnePost = (postId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/post/${postId}`)
		.then((res) => {
			dispatch({
				type: SET_POST,
				payload: res.data
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => console.log(err));
};

export const getPost = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/posts')
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data
			});
		})

		.catch((err) => console.error(err));
};

export const likePost = (postId) => (dispatch) => {
	axios
		.get(`/post/${postId}/like`)
		.then((res) => {
			dispatch({
				type: LIKE_POST,
				payload: res.data
			});
		})
		.catch((err) => console.error(err));
};

export const unlikePost = (postId) => (dispatch) => {
	axios
		.get(`/post/${postId}/unlike`)
		.then((res) => {
			dispatch({
				type: UNLIKE_POST,
				payload: res.data
			});
		})
		.catch((err) => console.error(err));
};

export const deletePost = (postId) => (dispatch) => {
	axios
		.delete(`/post/${postId}`)
		.then(() => {
			dispatch({
				type: DELETE_POST,
				payload: postId
			});
		})
		.catch((err) => console.log(err));
};

export const submitComment = (postId, comment) => (dispatch) => {
	axios
		.post(`/post/${postId}/comment`, comment)
		.then((res) => {
			dispatch({
				type: SUMMIT_COMMENT,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_ERROR,
				payload: err.response.data
			});
		});
};

export const getUserDetail = (username) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${username}`)
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data.posts
			});
		})
		.catch(() => {
			dispatch({
				type: SET_POSTS,
				payload: null
			});
		});
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
};
