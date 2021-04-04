import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyToolTip from '../../util/MyToolTip';

//material-ui
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//icon
import EditIcon from '@material-ui/icons/Edit';
//redux
import { editUserDetails } from '../../redux/actions/userActions';
import { Fragment } from 'react';

const style = (theme) => ({
	...theme.spreadThis,
	button: {
		float: 'right'
	}
});

function EditDetails(props) {
	const { credentials } = useSelector((state) => state.user);
	const [user, setUser] = useState({
		bio: '',
		website: '',
		location: ''
	});
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (credentials) {
			setUser({
				bio: credentials.bio ? credentials.bio : '',
				website: credentials.website ? credentials.website : '',
				location: credentials.location ? credentials.location : ''
			});
		}
	}, [credentials]);
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const dispatch = useDispatch();
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = () => {
		const userDetails = {
			...user
		};
		dispatch(editUserDetails(userDetails));
	};

	const { classes } = props;

	return (
		<Fragment>
			<MyToolTip
				tip="Edit Details"
				onClick={handleOpen}
				btnClassName={classes.button}>
				<EditIcon color="primary" />
			</MyToolTip>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Edit Your Details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="bio"
							type="text"
							label="bio"
							multiline
							rows="3"
							placeholder="A short bio about yourself"
							className={classes.textField}
							value={user.bio}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name="website"
							type="text"
							label="Website"
							multiline
							rows="3"
							placeholder="Your Social Media Website"
							className={classes.textField}
							value={user.website}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							name="location"
							type="text"
							label="Location"
							multiline
							rows="3"
							placeholder="Where you live"
							className={classes.textField}
							value={user.location}
							onChange={handleChange}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

EditDetails.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(style)(EditDetails);
