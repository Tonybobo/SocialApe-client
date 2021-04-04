import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
//redux
import { getPost } from "./../redux/actions/dataActions";
import { useSelector, useDispatch } from "react-redux";
//Component
import Post from "./../component/Post/Post";
import Profile from "../component/layout/Profile";
//Material-Ui
import { Grid } from "@material-ui/core";
import PostSkeleton from "../util/PostSkeleton";

function Home() {
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state) => state.data);
	useEffect(() => {
		dispatch(getPost());
	}, [dispatch]);

	let recentPostMarkUp =
		posts && !loading ? (
			posts.map((post) => <Post key={post.postId} post={post} />)
		) : (
			<PostSkeleton />
		);
	return (
		<Grid container spacing={10}>
			<Grid item sm={8} xs={12}>
				{recentPostMarkUp}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	);
}
Home.propTypes = {
	getPost: PropTypes.func
};

export default Home;
