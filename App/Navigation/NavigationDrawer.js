import React from "react";
import { DrawerNavigator } from "react-navigation";
import VerificationPin from '../Containers/VerificationPin'
import Verification from '../Containers/Verification'
import ProfileScreen from '../Containers/ProfileScreen'
import DrawerContent from "../Containers/DrawerContent";
import BlueButtonScreen from '../Containers/BlueButtonScreen';
import EOBClaimScreen from '../Containers/EOBClaimScreen';

import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
		  Profile: { screen: ProfileScreen }
	},
	{
		initialRouteName: "Profile",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
