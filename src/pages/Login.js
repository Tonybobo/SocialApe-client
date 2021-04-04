import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

import { Grid, TextField, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './../redux/actions/userActions';

const style = (theme) => ({
	...theme.spreadThis
});

function Login(props) {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.ui);

	const { classes } = props;
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: user.email,
			password: user.password
		};
		dispatch(loginUser(userData, props.history));
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
					Login
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
							Login
						</Button>
					)}

					<br />
					<small className={classes.signup}>
						don't have an account ? sign up <Link to="/signup">here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	loginUser: PropTypes.func,
	ui: PropTypes.object
};

export default withStyles(style)(Login);
