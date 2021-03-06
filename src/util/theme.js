// eslint-disable-next-line import/no-anonymous-default-export
export default {
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: "#808080"
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: "#495057",
			main: "#495057",
			dark: "#e91e63",
			// dark: will be calculated from palette.secondary.main,
			contrastText: "white"
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2
	},
	spreadThis: {
		form: {
			textAlign: "center"
		},
		logo: {
			height: "100px",
			margin: "20px auto 20px auto"
		},
		textField: {
			margin: "10px auto 10px auto"
		},
		pageTitle: {
			margin: "10px auto 10px auto"
		},
		button: {
			marginTop: 20,
			marginBottom: 10
		},
		customError: {
			color: "red",
			fontSize: "0.8rem",
			marginTop: 10
		},
		signup: {
			marginTop: 10
		},
		progress: {
			position: "relative"
		},

		invisibleSeparator: {
			border: "none",
			margin: 4
		},
		visibleSeparator: {
			width: "100%",
			borderBottom: "1px solid rgba(0,0,0,0.1)",
			marginBottom: 20
		},
		paper: {
			padding: 20
		},
		profile: {
			"& .image-wrapper": {
				textAlign: "center",
				position: "relative",
				"& button": {
					position: "absolute",
					top: "80%",
					left: "70%"
				}
			},
			"& .profile-image": {
				width: 200,
				height: 200,
				objectFit: "cover",
				maxWidth: "100%",
				borderRadius: "50%"
			},
			"& .profile-details": {
				textAlign: "center",
				"& span, svg": {
					verticalAlign: "middle"
				},
				"& a": {
					color: "#00bcd4"
				}
			},
			"& hr": {
				border: "none",
				margin: "0 0 10px 0"
			},
			"& svg.button": {
				"&:hover": {
					cursor: "pointer"
				}
			}
		},
		buttons: {
			textAlign: "center",
			"& a": {
				margin: "20px 10px"
			}
		}
	}
};
