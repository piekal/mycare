import React from "react";
import { DrawerNavigator } from "react-navigation";
import ProfileScreen from '../Containers/ProfileScreen'
import ListviewExample from "../Containers/ListviewExample";
import CardExample from "../Containers/CardExample";
import DrawerContent from "../Containers/DrawerContent";


import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
  		ProfileScreen: { screen: ProfileScreen },
		ListviewExample: { screen: ListviewExample },
		CardExample: { screen: CardExample },
	},
	{
		initialRouteName: "ProfileScreen",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
