import React from "react";
import { DrawerNavigator } from "react-navigation";
import ClaimsDataScreen from '../Containers/ClaimsDataScreen'
import VerificationPin from '../Containers/VerificationPin'
import Verification from '../Containers/Verification'
import ProfileScreen from '../Containers/ProfileScreen'
import DrawerContent from "../Containers/DrawerContent";


import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
  ClaimsDataScreen: { screen: ClaimsDataScreen },
  		ProfileScreen: { screen: ProfileScreen },
	},
	{
		initialRouteName: "ProfileScreen",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
