import React from "react";
import { DrawerNavigator } from "react-navigation";
import ClaimsDataScreen from '../Containers/ClaimsDataScreen'
import UploadScreen from '../Containers/UploadScreen'
import NoteListScreen from '../Containers/NoteListScreen'
import ProviderListScreen from '../Containers/ProviderListScreen'
import VerificationPin from '../Containers/VerificationPin'
import Verification from '../Containers/Verification'
import ProfileScreen from '../Containers/ProfileScreen'
import DrawerContent from "../Containers/DrawerContent";
import BlueButtonScreen from '../Containers/BlueButtonScreen';
import EOBClaimScreen from '../Containers/EOBClaimScreen';

import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
	Profile: { screen: ProfileScreen },
	// ClaimsDataScreen: { screen: ClaimsDataScreen },
	// UploadScreen: { screen: UploadScreen },
	// NoteListScreen: { screen: NoteListScreen, key: 'Note List' },
	// ProviderListScreen: { screen: ProviderListScreen },
	// ProfileScreen: { screen: ProfileScreen },
	// BlueButtonScreen: { screen: BlueButtonScreen },
	// EOBClaimScreen: { screen: EOBClaimScreen }
},
	{
		initialRouteName: "Profile",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
