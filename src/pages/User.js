import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import axios from "../axios";
import Post from "../component/Post/Post";
import StaticProfile from "./../component/layout/StaticProfile";
import PostSkeleton from "../util/PostSkeleton";

//MUI
import Grid from "@material-ui/core/Grid";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getUserDetail } from "./../redux/actions/dataActions";

function User(props) {
	const [profile, setProfile] = useState({});
	const [postIdParam, setpostIdParam] = useState(null);
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state) => state.data);

	useEffect(() => {
		const username = props.match.params.username;
		const postId = props.match.params.postId;
		if (postId) setpostIdParam(postId);
		dispatch(getUserDetail(username));
		axios
			.get(`/user/${username}`)
			.then((res) => {
				setProfile(res.data.user);
			})
			.catch((err) => console.log(err));
	}, [
		dispatch,
		props.match.params.username,
		postIdParam,
		props.match.params.postId
	]);

	const postsMarkUp = loading ? (
		<PostSkeleton />
	) : posts === null ? (
		<p>No posts from this user</p>
	) : !postIdParam ? (
		posts?.map((post) => <Post key={post.postId} post={post} />)
	) : (
		posts?.map((post) => {
			if (post.postId !== postIdParam)
				return <Post key={post.postId} post={post} />;
			else return <Post key={post.postId} post={post} openDialog />;
		})
	);

	return (
		<Grid container spacing={16}>
			<Grid item sm={8} xs={12}>
				{postsMarkUp}
			</Grid>
			<Grid item sm={4} xs={12}>
				{profile === null ? (
					<p>profile is empty</p>
				) : (
					<StaticProfile profile={profile} />
				)}
			</Grid>
		</Grid>
	);
}

User.propTypes = {
	getUserData: PropTypes.func,
	posts: PropTypes.object,
	loading: PropTypes.bool
};

export default User;
