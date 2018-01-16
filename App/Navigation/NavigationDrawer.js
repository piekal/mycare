import React from "react";
import { DrawerNavigator } from "react-navigation";
import Login from "../Containers/LoginScreen";

import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
		Login: { screen: Login },
	
	},
	{
		initialRouteName: "Login",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
