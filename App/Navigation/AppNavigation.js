import React from "react";
import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

// screens identified by the router
import Login from "../Containers/LoginScreen";
import LaunchScreen from "../Containers/LaunchScreen";
import NavigationDrawer from "./NavigationDrawer";
import Welcome from '../Containers/WelcomeScreen';
import Signup from '../Containers/SignupScreen';
import EmailSignin from '../Containers/EmailSigninScreen';

const PrimaryNav = StackNavigator(
	{
		Login: { screen: Login },
		LaunchScreen: { screen: LaunchScreen },
		NavigationDrawer: { screen: NavigationDrawer },
		Welcome: { screen: Welcome },
		Signup: { screen: Signup },
		EmailSignin: { screen: EmailSignin }
	},
	{
		initialRouteName: "Welcome",
		headerMode: "none",
	}
);

export default PrimaryNav;
