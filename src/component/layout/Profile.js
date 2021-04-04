import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";
import MyToolTip from "../../util/MyToolTip";
import ProfileSkeleton from "../../util/ProfileSkeleton";

//Material-UI
import {
	Button,
	Paper,
	Link as MuiLink,
	Typography,
	IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

//icon
import ExploreIcon from "@material-ui/icons/Explore";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

//redux

const style = (theme) => ({
	...theme.spreadThis
});

function Profile(props) {
	const { classes } = props;
	const dispatch = useDispatch();
	const {
		credentials: { username, createdAt, imageUrl, bio, website, location },
		loading,
		authenticated
	} = useSelector((state) => state.user);
	const handleImageChange = (e) => {
		const image = e.target.files[0];
		//send image to server
		const formData = new FormData();
		formData.append("image", image, image.name);
		dispatch(uploadImage(formData));
	};

	const handleEditPicture = () => {
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	let profileMarkUp = !loading ? (
		authenticated ? (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile" className="profile-image" />
						<input
							type="file"
							id="imageInput"
							hidden="hidden"
							onChange={handleImageChange}
						/>
						<MyToolTip
							tip="Upload Image"
							onClick={handleEditPicture}
							btnClassName={classes.button}>
							<EditIcon color="primary"></EditIcon>
						</MyToolTip>
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink
							component={Link}
							to={`/users/${username}`}
							color="primary"
							variant="h5">
							@{username}
						</MuiLink>
						<hr />
						{bio && <Typography variant="body2">{bio}</Typography>}
						<hr />
						{location && (
							<>
								<ExploreIcon color="primary" />
								<span>{location}</span>

								<hr />
							</>
						)}
						{website && (
							<>
								<LinkIcon color="primary" />
								<a href={website} target="_blank" rel="noopener noreferrer">
									{" "}
									{website}
								</a>
								<hr />
							</>
						)}
						<CalendarTodayIcon color="primary" />{" "}
						<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
					</div>
					<Tooltip title="Logout" placement="top">
						<IconButton onClick={handleLogout}>
							<KeyboardReturn color="primary"></KeyboardReturn>
						</IconButton>
					</Tooltip>
					<EditDetails />
				</div>
			</Paper>
		) : (
			<Paper className={classes.paper}>
				<Typography variant="body2" align="center">
					No profile found,please login again
				</Typography>
				<div className={classes.buttons}>
					<Button
						color="primary"
						variant="contained"
						component={Link}
						to="/login">
						Login
					</Button>
					<Button
						color="secondary"
						variant="contained"
						component={Link}
						to="/signup">
						Sign Up
					</Button>
				</div>
			</Paper>
		)
	) : (
		<ProfileSkeleton />
	);
	return profileMarkUp;
}
Profile.propTypes = {
	logoutUser: PropTypes.func,
	uploadImage: PropTypes.func,
	classes: PropTypes.object.isRequired,
	user: PropTypes.object
};

export default withStyles(style)(Profile);
