import React from "react";
import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

// screens identified by the router
import Login from "../Containers/LoginScreen";
import LaunchScreen from "../Containers/LaunchScreen";
import NavigationDrawer from "./NavigationDrawer";
import Welcome from '../Containers/WelcomeScreen';;

const PrimaryNav = StackNavigator(
	{
		Login: { screen: Login },
		LaunchScreen: { screen: LaunchScreen },
		NavigationDrawer: { screen: NavigationDrawer },
		Welcome: { screen: Welcome }
	},
	{
		initialRouteName: "Welcome",
		headerMode: "none",
	}
);

export default PrimaryNav;
