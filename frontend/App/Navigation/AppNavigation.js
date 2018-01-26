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
import BlueButtonScreen from '../Containers/BlueButtonScreen';
import EOBClaimScreen from '../Containers/EOBClaimScreen';
import ClaimsDataScreen from '../Containers/ClaimsDataScreen'
import ProviderListScreen from '../Containers/ProviderListScreen';
import PayerListScreen from '../Containers/PayerListScreen';
import NoteListScreen from '../Containers/NoteListScreen';
import UploadScreen from '../Containers/UploadScreen';
import EditProfileScreen from '../Containers/EditProfileScreen';
import DiagnosticScreen from '../Containers/DiagnosticsScreen';


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
		BlueButtonScreen: { screen: BlueButtonScreen },
		EOBClaimScreen: { screen: EOBClaimScreen },
	        ClaimsDataScreen: { screen: ClaimsDataScreen },
                PayerListScreen: { screen: PayerListScreen },
		ProviderListScreen: { screen: ProviderListScreen },
		NoteListScreen: { screen: NoteListScreen },
		UploadScreen: { screen: UploadScreen },
		EditProfileScreen: { screen: EditProfileScreen },
		DiagnosticScreen: { screen: DiagnosticScreen }
	},
	{
		initialRouteName: "Welcome",
		// initialRouteName: "NavigationDrawer",
		headerMode: "none"
	}
);

export default PrimaryNav;
