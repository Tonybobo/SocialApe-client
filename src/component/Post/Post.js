import React from "react";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import PostDialog from "./PostDialog";

//Material-Ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
//icon
import ChatIcon from "@material-ui/icons/Chat";

//redux
import MyToolTip from "../../util/MyToolTip";
import LikeButton from "./LikeButton";
import { useSelector } from "react-redux";
import DeletePost from "./DeletePost";

dayjs.extend(relativeTime);

const styles = (theme) => ({
	card: {
		position: "relative",
		display: "flex",
		marginBottom: 20,
		marginRight: 20,
		flexWrap: "wrap"
	},
	image: {
		minWidth: 200
	},
	content: { padding: 25, objectFit: "cover" },
	comment: {
		marginRight: "10px"
	}
});

function Post({
	classes,
	post: {
		userImage,
		body,
		createdAt,
		username,
		postId,
		likeCount,
		commentCount
	},
	openDialog
}) {
	const { authenticated, credentials } = useSelector((state) => state.user);

	const deleteButton =
		authenticated && username === credentials.username ? (
			<DeletePost postId={postId} />
		) : null;

	return (
		<Card className={classes.card}>
			<CardMedia
				image={userImage}
				title="Profile image"
				className={classes.image}
			/>
			<CardContent className={classes.content}>
				<Typography
					variant="h5"
					component={Link}
					to={`/users/${username}`}
					color="primary">
					{username}
				</Typography>
				{deleteButton}

				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant="h6">{body}</Typography>
				<LikeButton postId={postId} />
				<span>{likeCount} Likes</span>
				<MyToolTip tip="comments">
					<ChatIcon color="primary" />
				</MyToolTip>
				<span className={classes.comment}>{commentCount} comments</span>
				<PostDialog
					postId={postId}
					username={username}
					openDialog={openDialog}
				/>
			</CardContent>
		</Card>
	);
}
Post.propTypes = {
	likePost: PropTypes.func,
	unlikePost: PropTypes.func,
	user: PropTypes.object,
	post: PropTypes.object,
	classess: PropTypes.object,
	openDialog: PropTypes.bool
};

export default withStyles(styles)(Post);
