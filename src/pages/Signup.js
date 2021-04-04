import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

import { Grid, TextField, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './../redux/actions/userActions';

const style = (theme) => ({
	...theme.spreadThis
});
function Signup(props) {
	const { classes } = props;
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.ui);
	const [user, setUser] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		username: ''
	});
	const handleSubmit = (e) => {
		e.preventDefault();

		const newUserData = {
			email: user.email,
			password: user.password,
			confirmPassword: user.confirmPassword,
			username: user.username
		};

		dispatch(signupUser(newUserData, props.history));
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<Grid container className={classes.form}>
			<Grid item sm />
			<Grid item sm>
				<img className={classes.logo} src={AppIcon} alt="icon" />
				<Typography variant="h2" className={classes.pageTitle}>
					Signup
				</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id="email"
						name="email"
						type="email"
						label="Email"
						className={classes.textField}
						value={user.email}
						helperText={error?.email}
						error={error?.email ? true : false}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						id="password"
						name="password"
						type="password"
						label="Password"
						className={classes.textField}
						helperText={error?.password}
						error={error?.password ? true : false}
						value={user.password}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						className={classes.textField}
						helperText={error?.confirmPassword}
						error={error?.confirmPassword ? true : false}
						value={user.confirmPassword}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						id="username"
						name="username"
						type="username"
						label="Username"
						className={classes.textField}
						helperText={error?.username}
						error={error?.username ? true : false}
						value={user.username}
						onChange={handleChange}
						fullWidth
					/>
					{error?.general && (
						<Typography variant="body2" className={classes.customError}>
							{error?.general}
						</Typography>
					)}
					{loading ? (
						<CircularProgress
							color="secondary"
							size={30}
							className={classes.progress}
						/>
					) : (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}>
							Signup
						</Button>
					)}

					<br />
					<small className={classes.signup}>
						already have an account ? Login <Link to="/signup">here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
}

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object
};

export default withStyles(style)(Signup);
