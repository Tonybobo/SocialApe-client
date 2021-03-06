import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const style = (theme) => ({
	...theme.spreadThis,
	commentImage: {
		maxWidth: "100%",
		height: 100,
		objectFit: "cover",
		borderRadius: "50%"
	},
	commentData: {
		marginLeft: 20
	}
});

function Comment({ comments, classes }) {
	return (
		<Grid container>
			{comments?.map((comment, index) => {
				const { body, createdAt, userImage, username } = comment;
				return (
					<Fragment key={createdAt}>
						<Grid item sm={12}>
							<Grid container>
								<Grid item sm={2}>
									<img
										src={userImage}
										alt="comment"
										className={classes.commentImage}
									/>
								</Grid>
								<Grid item sm={9}>
									<div className={classes.commentData}>
										<Typography
											variant="h5"
											component={Link}
											to={`/users/${username}`}
											color="primary">
											{username}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											{dayjs(createdAt).format("h:mm a, DD MMM YYYY")}
										</Typography>
										<hr className={classes.invisibleSeparator} />
										<Typography variant="body1">{body}</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{index !== comments.length - 1 && (
							<hr className={classes.visibleSeparator} />
						)}
					</Fragment>
				);
			})}
		</Grid>
	);
}

Comment.propTypes = {
	comments: PropTypes.array.isRequired
};

export default withStyles(style)(Comment);
