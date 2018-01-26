import React, { Component } from 'react'
import { BackHandler, AsyncStorage, Image } from 'react-native'
import { Root, Content, Container, Header, Left, Right, Body, Button, Text, Title, View, Icon, Input, List, ListItem, Spinner, Item, ActionSheet } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditProfileScreenStyle'
import { Images, Metrics, Colors } from "../Themes";

import * as axios from 'axios';

const CITIES = ["New York", "Texas", "New Jersey", "Chicago", "CANCLE"];
const CANCEL_INDEX = CITIES.length - 1;

class EditProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetching: true,
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      race: ''
    }
  }

  componentWillMount() {
    AsyncStorage.multiGet(['firstName', 'lastName', 'email']).then((data) => {
      let firstName = data[0][1];
      let lastName = data[1][1];
      let email = data[2][1];

      this.setState({
        fetching: false,
        firstName: firstName,
        lastName: lastName,
        email: email
      })

    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  renderUserData() {
    if (this.state.fetching) {
      return (<Spinner color="#000000" />)
    } else {
      return (
        <View>

          {this.getUserImage()}


          <List style={{ backgroundColor: '#FFFFFF' }}>

            <ListItem style={styles.listItem}>
              <Left>
                <Text style={styles.textLabel}>NAME</Text>
              </Left>
              <Body>
                <Item>
                  <Input style={styles.textValue} placeholder={`${this.state.firstName} ${this.state.lastName}`} />
                </Item>
              </Body>

            </ListItem>

            <ListItem style={styles.listItem}>
              <Left>
                <Text style={styles.textLabel}>CITY</Text>
              </Left>

              <Button iconLeft transparent onPress={() =>
                ActionSheet.show(
                  {
                    options: CITIES,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: "SELECT YOUR CITY"
                  },
                  buttonIndex => {
                    // this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )}>
                <Icon name="ios-arrow-forward" style={{ color: '#000' }} />
              </Button>
            </ListItem>

            <ListItem style={styles.listItem}>
              <Left>
                <Text style={styles.textLabel} >DOB</Text>
              </Left>

              <Body>
                <Item>
                  <Input style={styles.textValue} placeholder={(this.state.dob) ? this.state.dob : ''} />
                </Item>
              </Body>
            </ListItem>

            <ListItem style={styles.listItem}>
              <Left>
                <Text style={styles.textLabel} >RACE</Text>
              </Left>

              <Body>
                <Item>
                  <Input style={styles.textValue} placeholder={(this.state.race) ? this.state.race : ''} />
                </Item>
              </Body>
            </ListItem>

            <ListItem itemDivider />

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >EMAIL</Text>
              </Left>

              <Text style={styles.textEmail} >{this.state.email}</Text>
            </ListItem>

            <ListItem style={[styles.justifyCenter]}>
              <Button transparent>
                <Text style={styles.passText} > RESET PASSWORD</Text>
              </Button>

            </ListItem>

          </List>
        </View>
      )

    }
  }

  getUserImage() {
    return (
      <Image resizeMode="contain" source={Images.userIcon} style={styles.profileImage} />
    )
  }

  render() {
    return (
      <Root>
      <Container>
        <Header style={{ backgroundColor: '#FFF' }}>
          <Left>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>Edit Profile</Title>
          </Body>
          <Right>

            <Button
              transparent
              onPress={() => this.props.navigation.navigate("ProfileScreen")}
            >
              <Text style={{ color: '#000', fontSize: 14 }}>CANCEL</Text>
            </Button>

          </Right>

        </Header>

        <Content>
          {this.renderUserData()}
        </Content>

      </Container>
      </Root>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)