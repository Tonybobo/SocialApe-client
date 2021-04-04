import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Comment from "./Comment";

import LikeButton from "./LikeButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
import MyToolTip from "./../../util/MyToolTip";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getOnePost, clearErrors } from "../../redux/actions/dataActions";
import CommentForm from "./CommentForm";

const style = (theme) => ({
	...theme.spreadThis,
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover"
	},
	dialogContent: {
		padding: 20
	},
	closeButton: {
		position: "absolute",
		left: "90%"
	},
	expandButton: {
		position: "absolute",
		left: "90%",
		bottom: "15%"
	},
	spinnerDiv: {
		textAlign: "center",
		marginTop: 50,
		marginBottom: 50
	}
});

function PostDialog({ classes, postId, username, openDialog }) {
	const { loading } = useSelector((state) => state.ui);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [oldPath, setOldPath] = useState("");
	const { post } = useSelector((state) => state.data);
	useEffect(() => {
		if (openDialog) {
			handleOpen();
		}
	}, []);
	const handleOpen = () => {
		let oldPath = window.location.pathname;
		const newPath = `/users/${username}/post/${postId}`;
		if (oldPath === newPath) oldPath = `/users/${username}`;

		window.history.pushState(null, null, newPath);
		setOpen(true);
		setOldPath(oldPath);
		dispatch(getOnePost(postId));
	};
	const handleClose = () => {
		window.history.pushState(null, null, oldPath);
		setOpen(false);
		dispatch(clearErrors());
	};

	const dialogMarkUp = loading ? (
		<div className={classes.spinnerDiv}>
			<CircularProgress size={200} thickness={2} />
		</div>
	) : (
		<Grid container spacing={16}>
			<Grid item sm={5}>
				<img
					src={post?.userImage}
					alt="Profile"
					className={classes.profileImage}
				/>
			</Grid>
			<Grid item sm={7}>
				<Typography
					component={Link}
					color="primary"
					variant="h5"
					to={`/users/${post?.username}`}>
					@{post?.username}
				</Typography>
				<hr className={classes.invisibleSeparator} />
				<Typography variant="body2" color="textSecondary">
					{dayjs(post?.createdAt).format("h:mm a, MMMM DD YYYY")}
				</Typography>
				<hr className={classes.invisibleSeparator} />
				<Typography variant="body1">{post?.body}</Typography>
				<LikeButton postId={postId} />
				<span>{post?.likeCount} likes</span>
				<MyToolTip tip="comments">
					<ChatIcon color="primary" />
				</MyToolTip>
				<span>{post?.commentCount} comments</span>
			</Grid>
			<hr className={classes.visibleSeparator} />
			<CommentForm postId={postId} />
			<Comment comments={post?.comments} />
		</Grid>
	);

	return (
		<Grid>
			<MyToolTip
				onClick={handleOpen}
				tip="Expand Post"
				tipClassName={classes.expandButton}>
				<UnfoldMore color="primary" />
			</MyToolTip>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<MyToolTip
					tip="Close"
					onClick={handleClose}
					tipClassName={classes.closeButton}>
					<CloseIcon />
				</MyToolTip>
				<DialogContent className={classes.dialogContent}>
					{dialogMarkUp}
				</DialogContent>
			</Dialog>
		</Grid>
	);
}
PostDialog.propTypes = {
	getOnePost: PropTypes.func,
	post: PropTypes.object,
	clearErrors: PropTypes.func
};
export default withStyles(style)(PostDialog);
