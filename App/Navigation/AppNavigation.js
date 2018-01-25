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
import VerificationPin from '../Containers/VerificationPin';
import Verification from '../Containers/Verification';
import ProviderListScreen from '../Containers/ProviderListScreen';
import NoteListScreen from '../Containers/NoteListScreen';
import UploadScreen from '../Containers/UploadScreen'


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
		Verification: { screen: Verification },
		ProviderListScreen: { screen: ProviderListScreen },
		NoteListScreen: { screen: NoteListScreen },
		UploadScreen: { screen: UploadScreen },


	},
	{
		initialRouteName: "NoteListScreen",
		// initialRouteName: "NavigationDrawer",
		headerMode: "none",
	}
);

export default PrimaryNav;
