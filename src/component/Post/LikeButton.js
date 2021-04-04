import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
//icon
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';
import MyToolTip from '../../util/MyToolTip';

function LikeButton({ postId }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const likedPost = () => {
		if (user.likes && user.likes.find((like) => like.postId === postId)) {
			return true;
		} else return false;
	};
	const postLike = () => {
		dispatch(likePost(postId));
		console.log(postId);
	};
	const postUnlike = () => {
		dispatch(unlikePost(postId));
		console.log(postId);
	};
	const likeButton = !user.authenticated ? (
		<Link to="/login">
			<MyToolTip tip="Like">
				<FavoriteBorderIcon color="primary" />
			</MyToolTip>
		</Link>
	) : likedPost() ? (
		<MyToolTip tip="Undo Like" onClick={postUnlike}>
			<FavoriteIcon color="primary" />
		</MyToolTip>
	) : (
		<MyToolTip tip="Like" onClick={postLike}>
			<FavoriteBorderIcon color="primary" />
		</MyToolTip>
	);
	return likeButton;
}

LikeButton.propTypes = {
	user: PropTypes.object,
	postId: PropTypes.string,
	postLike: PropTypes.func,
	postUnlike: PropTypes.func
};

export default LikeButton;
