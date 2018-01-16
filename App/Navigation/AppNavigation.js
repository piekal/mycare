import React from "react";
import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

// screens identified by the router
import Login from "../Containers/LoginScreen";
import LaunchScreen from "../Containers/LaunchScreen";
import NavigationDrawer from "./NavigationDrawer";
import ProfileScreen from '../Containers/ProfileScreen';


const PrimaryNav = StackNavigator(
	{
		Login: { screen: Login },
		LaunchScreen: { screen: LaunchScreen },
		NavigationDrawer: { screen: NavigationDrawer },
		ProfileScreen: { screen: ProfileScreen },

	},
	{
		initialRouteName: "LaunchScreen",
		headerMode: "none",
	}
);

export default PrimaryNav;
