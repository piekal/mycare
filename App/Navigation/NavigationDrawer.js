import React from "react";
import { DrawerNavigator } from "react-navigation";
import VerificationPin from '../Containers/VerificationPin'
import Verification from '../Containers/Verification'
import ProfileScreen from '../Containers/ProfileScreen'
import DrawerContent from "../Containers/DrawerContent";


import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
  		VerificationPin: { screen: VerificationPin },
  		Verification: { screen: Verification },
  		ProfileScreen: { screen: ProfileScreen },
	},
	{
		initialRouteName: "ProfileScreen",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
