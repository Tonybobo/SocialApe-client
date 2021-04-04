import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import MyToolTip from './../../util/MyToolTip';
import { withStyles } from '@material-ui/core/styles';

//material-ui
import { Button } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

//redux
import { deletePost } from '../../redux/actions/dataActions';
import { useDispatch } from 'react-redux';

const styles = (theme) => ({
	...theme.spreadThis,
	deleteButton: {
		position: 'absolute',
		left: '90%',
		top: '10%'
	}
});

function DeletePost(props) {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const DeletePost = () => {
		setOpen(false);
		dispatch(deletePost(props.postId));
	};
	const { classes } = props;
	return (
		<>
			<MyToolTip
				tip="Delete Post"
				onClick={handleOpen}
				btnClassName={classes.deleteButton}>
				<DeleteIcon color="primary" />
			</MyToolTip>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Are you sure you want to delete this post?</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={DeletePost} color="secondary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

DeletePost.propTypes = {
	deletePost: PropTypes.func,
	classes: PropTypes.object,
	postId: PropTypes.string
};
export default withStyles(styles)(DeletePost);
