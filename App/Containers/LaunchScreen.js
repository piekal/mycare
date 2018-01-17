import React from "react";
import { ScrollView, Text, Image, View } from "react-native";
import { Button, Text as NBText } from "native-base";
import { Images } from "../Themes";

// Styles
import styles from "./Styles/LaunchScreenStyles";

export default class LaunchScreen extends React.Component {
	render() {
		return (
			<View style={styles.mainContainer}>
				<ScrollView style={{backgroundColor:'#ffffff',paddingTop:65}}>
				
					<View style={styles.section}>
						<NBText style={{alignSelf: "center",color:'#4B74FF', fontSize:42}}>myCare.</NBText>
						<NBText style={{alignSelf: "center",color:'#333333',fontSize:18}}>Data Wallet</NBText>
					</View>
					
				</ScrollView>
			</View>
		);
	}
}
