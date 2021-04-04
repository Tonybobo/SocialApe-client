import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import MyToolTip from "../../util/MyToolTip";
import CreatePost from "../Post/CreatePost";
import Notifications from "./Notifications";

//Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//icon
import HomeIcon from "@material-ui/icons/Home";

//redux
import { useSelector } from "react-redux";

function Navbar() {
	const { authenticated } = useSelector((state) => state.user);
	return (
		<AppBar>
			<Toolbar className="nav-container">
				{authenticated ? (
					<Fragment>
						<CreatePost />
						<Link to="/">
							<MyToolTip tip="Home">
								<HomeIcon color="primary" />
							</MyToolTip>
						</Link>

						<Notifications />
					</Fragment>
				) : (
					<Fragment>
						<Button color="inherit" component={Link} to="/login">
							Login
						</Button>
						<Button color="inherit" component={Link} to="/signup">
							Signup
						</Button>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
					</Fragment>
				)}
			</Toolbar>
		</AppBar>
	);
}
Navbar.propTypes = {
	authenticated: PropTypes.bool
};

export default Navbar;
