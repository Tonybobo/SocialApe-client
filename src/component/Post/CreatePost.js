import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import MyToolTip from './../../util/MyToolTip';
//material-ui
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//icon
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//redux
import { createPost, clearErrors } from '../../redux/actions/dataActions';

const style = (theme) => ({
	...theme.spreadThis,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10
	},
	progressSpinner: {
		position: 'absolute'
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '5%'
	}
});

function CreatePost(props) {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const [body, setBody] = useState('');
	const { loading, error } = useSelector((state) => state.ui);

	useEffect(() => {
		if (!error && !loading) {
			setOpen(false);
			setBody('');
		}
	}, [error, loading]);

	const handleChange = (e) => {
		setBody(e.target.value);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		dispatch(clearErrors());
		setOpen(false);
		setBody('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createPost({ body }));
	};
	const { classes } = props;
	return (
		<>
			<MyToolTip tip="Create Post" onClick={handleOpen}>
				<AddIcon />
			</MyToolTip>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<MyToolTip
					tip="close"
					onClick={handleClose}
					tipClassName={classes.closeButton}>
					<CloseIcon />
				</MyToolTip>
				<DialogTitle> Create a Post</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
							name="body"
							type="text"
							label="Post"
							multiline
							rows="3"
							placeholder="Write Your issues"
							className={classes.textField}
							error={error?.body ? true : false}
							helperText={error?.body}
							value={body}
							onChange={handleChange}
							fullWidth
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submitButton}
							disabled={loading}>
							Submit{' '}
							{loading && (
								<CircularProgress
									size={30}
									className={classes.progressSpinner}
								/>
							)}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}

CreatePost.propTypes = {
	createPost: PropTypes.func
};

export default withStyles(style)(CreatePost);
