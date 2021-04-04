import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "./axios";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
//material ui
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./component/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import User from "./pages/User";

function App() {
	const theme = createMuiTheme(themeObject);
	const token = localStorage.token;
	if (token) {
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp * 1000 < Date.now()) {
			store.dispatch(logoutUser());
			window.location.href = "/login";
		} else {
			store.dispatch({ type: SET_AUTHENTICATED });
			axios.defaults.headers.common["Authorization"] = token;
			store.dispatch(getUserData());
		}
	}
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<AuthRoute exact path="/login" component={Login} />
							<AuthRoute exact path="/signup" component={Signup} />
							<Route exact path="/users/:username" component={User} />
							<Route
								exact
								path="/users/:username/post/:postId"
								component={User}
							/>
						</Switch>
					</div>
				</Router>
			</Provider>
		</ThemeProvider>
	);
}

export default App;
