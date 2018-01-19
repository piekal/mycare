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
import PasswordSignin from '../Containers/PasswordSigninScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import VerificationPin from '../Containers/VerificationPin'
import Verification from '../Containers/Verification'



const PrimaryNav = StackNavigator(
	{
		Login: { screen: Login },
		LaunchScreen: { screen: LaunchScreen },
		NavigationDrawer: { screen: NavigationDrawer },
		Welcome: { screen: Welcome },
		Signup: { screen: Signup },
		EmailSignin: { screen: EmailSignin },
		PasswordSignin: { screen: PasswordSignin },
		ProfileScreen: { screen: ProfileScreen },
		VerificationPin: { screen: VerificationPin },
		Verification: { screen: Verification }


	},
	{
		initialRouteName: "Verification",
		headerMode: "none",
	}
);

export default PrimaryNav;
