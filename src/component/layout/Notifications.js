import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { withStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "./../../redux/actions/userActions";
//MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

//Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

dayjs.extend(relativeTime);

const styles = (theme) => ({
	...theme.spreadThis,
	menu: {
		marginBottom: 10,
		borderBottom: "1px"
	}
});

function Notifications(props) {
	const { classes } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const { notifications } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleOpen = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const onMenuOpened = () => {
		let unread = notifications
			.filter((not) => !not.read)
			.map((not) => not.notificationId);
		dispatch(markNotificationsRead(unread));
	};

	let notificationIcon;
	if (notifications && notifications.length > 0) {
		notifications.filter((not) => not.read === false).length > 0
			? (notificationIcon = (
					<Badge
						badgeContent={
							notifications.filter((not) => not.read === false).length
						}
						color="secondary">
						<NotificationsIcon />
					</Badge>
			  ))
			: (notificationIcon = <NotificationsIcon />);
	} else {
		notificationIcon = <NotificationsIcon />;
	}

	let notificationMarkup =
		notifications && notifications.length > 0 ? (
			notifications.map((not) => {
				const action = not.type === "like" ? "liked" : "commented on";
				const time = dayjs(not.createdAt).fromNow();
				const iconColor = not.read ? "primary" : "secondary";
				const icon =
					not.type === "like" ? (
						<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
					) : (
						<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
					);
				return (
					<MenuItem
						key={not.createdAt}
						className={classes.menu}
						onClick={handleClose}>
						{icon}
						<Typography
							component={Link}
							color="default"
							variant="body1"
							to={`/users/${not.recipient}/post/${not.postId}`}>
							{not.sender} {action} your post {time}
						</Typography>
					</MenuItem>
				);
			})
		) : (
			<MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
		);
	return (
		<>
			<Tooltip placement="top" title="Notifications">
				<IconButton
					aria-owns={anchorEl ? "simple-menu" : undefined}
					aria-haspopup="true"
					onClick={handleOpen}>
					{notificationIcon}
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onEntered={onMenuOpened}>
				{notificationMarkup}
			</Menu>
		</>
	);
}

Notifications.propTypes = {
	markNotificationsRead: PropTypes.func,
	notifications: PropTypes.array
};

export default withStyles(styles)(Notifications);
