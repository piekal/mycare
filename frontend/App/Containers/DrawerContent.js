import React, { Component } from "react";
import { ScrollView, Image, BackHandler, AsyncStorage } from "react-native";
import { List, ListItem, Text, View, Content, Container, Footer } from "native-base";

import styles from "./Styles/DrawerContentStyles";
import { Images } from "../Themes";
import BackgroundImage from '../Components/BackgroundImage';
import Metrics from '../Themes/Metrics';

class DrawerContent extends Component {
	render() {
		const navigation = this.props.navigation;
		const items = this.props.items;
		return (
			<Container style={{flex: 1}}>
				<BackgroundImage>
					{/* <View style={styles.container}> */}
						{/* <Image source={Images.logoDark} style={styles.logo} /> */}
						<Content>
							<List
								dataArray={items}
								renderRow={item => (
									<ListItem onPress={() => navigation.navigate(item.routeName)}>
										<Text>{item.routeName}</Text>
									</ListItem>
								)}
							/>
						</Content>

						<Footer style={styles.footer}>

							<List>
								<ListItem
									onPress={() => { AsyncStorage.removeItem('userId'); this.props.navigation.navigate("Welcome") }}>

									<Text>Log Out</Text>

								</ListItem>
							</List>

						</Footer>
					{/* </View> */}
				</BackgroundImage>
			</Container>
		);
	}
}

export default DrawerContent;
