import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { submitComment, clearErrors } from './../../redux/actions/dataActions';

const style = (theme) => ({
	...theme.spreadThis
});

function CommentForm(props) {
	const { classes, postId } = props;
	const [body, setBody] = useState('');
	const { authenticated } = useSelector((state) => state.user);
	const { error } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(submitComment(postId, { body }));
		dispatch(clearErrors());
		setBody('');
	};

	useEffect(() => {}, [body]);

	const commentFormMarkUp = authenticated ? (
		<Grid item sm={12} style={{ textAlign: 'center' }}>
			<form onSubmit={handleSubmit}>
				<TextField
					name="body"
					type="text"
					label="Comment on scream"
					error={error?.comment ? true : false}
					helperText={error?.comment}
					value={body}
					onChange={(e) => setBody(e.target.value)}
					fullWidth
					className={classes.textField}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={classes.button}>
					Submit
				</Button>
			</form>
			<hr className={classes.visibleSeparator} />
		</Grid>
	) : null;
	return commentFormMarkUp;
}

CommentForm.propTypes = {
	submitComment: PropTypes.func,
	classes: PropTypes.object,
	authenticated: PropTypes.bool,
	postId: PropTypes.string
};

export default withStyles(style)(CommentForm);
