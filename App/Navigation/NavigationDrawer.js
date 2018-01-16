import React from "react";
import { DrawerNavigator } from "react-navigation";
import ProfileScreen from '../Containers/ProfileScreen'
import DrawerContent from "../Containers/DrawerContent";


import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
  		ProfileScreen: { screen: ProfileScreen },
	},
	{
		initialRouteName: "ProfileScreen",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
