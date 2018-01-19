import React, { Component } from 'react'
import { BackHandler, AsyncStorage } from 'react-native'
import { Content, Container, Header, Left, Right, Body, View, Button, Text, Title, Icon, List, ListItem, CheckBox, Input, Spinner } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import { Image } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";

import * as axios from 'axios';



class ProfileScreen extends Component {

  constructor(props) {
    super(props)


    this.state = {
      fetching: true,
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      race: '',
      token: ''
    }
  }

  componentWillMount() {
    AsyncStorage.multiGet(['userId', 'token']).then((data) => {
      let userId = data[0][1];
      let token = data[1][1];

      token = `JWT ${token}`;

      this.setState({
        fetching: true
      });

      this.getUserData(userId, token);
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    });

  }

  connectToProviders() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Button rounded style={styles.btn}>
          <Text>Connect to CMS</Text>
        </Button>

        <Button rounded bordered style={[styles.btn, styles.btnOutline]}>
          <Text style={styles.outlineBtnText}>Connect to other Providers</Text>
        </Button>

      </View>
    )
  }

  getUserData(userId, token) {

    var that = this;

    axios.get(`https://www.mycare-api.com/api/v1/user/${userId}/profile`, {
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      let userDetails = response.data;

      that.setState({
        fetching: false,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
      })
    }).catch((err) => {

      if (err.response.status === 401) {

        this.props.navigation.navigate('EmailSignin');
        alert(JSON.stringify(err));

      } else {
        alert('A network error occured');
      }
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

            <ListItem>
              <Left>
                <Text style={styles.textLabel}>NAME</Text>
              </Left>

              <Text style={styles.textValue} >{`${this.state.firstName} ${this.state.lastName}`}</Text>

            </ListItem>

            <ListItem>
              <Left>
                <Text style={styles.textLabel}>CITY</Text>
              </Left>

              <Button icon transparent primary>
                <Icon name='ios-arrow-forward' style={{ color: '#000' }} />
              </Button>
            </ListItem>

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >DOB</Text>
              </Left>

              <Text style={styles.textValue} >{this.state.city}</Text>
            </ListItem>

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >RACE</Text>
              </Left>

              <Text style={styles.textValue} >{this.state.race}</Text>
            </ListItem>

            <ListItem itemDivider />

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >EMAIL</Text>
              </Left>

              <Text style={styles.textValue} >{this.state.email}</Text>
            </ListItem>

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >PASSWORD</Text>
              </Left>

              <Right>
                <Input
                  style={[styles.textValue, { flex: 1, width: 50 }]}
                  value={"password"}
                  editable={false}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                />
              </Right>
            </ListItem>

            <ListItem itemDivider />

            <ListItem>
              {this.connectToProviders()}
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
      <Container>
        <Header style={{ backgroundColor: '#FFF' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")} >
              <Icon name="ios-menu" style={{ color: '#000' }} />
            </Button>

          </Left>

          <Body>
            <Title style={{ color: Colors.coal }}>Profile</Title>
          </Body>

          <Right />

        </Header>

        <Content style={{ backgroundColor: '#E4E4E4' }} >

          {this.renderUserData()}

        </Content>

      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    // fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)