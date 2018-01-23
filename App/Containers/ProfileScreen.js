import React, { Component } from 'react'
import { BackHandler, AsyncStorage, StyleSheet } from 'react-native'
import { Content, Container, Header, Left, Right, Body, View, Button, Text, Title, Icon, List, ListItem, CheckBox, Input, Spinner } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle';
import { timeLineStyles } from './Styles/TimelineStyles';
import { Image } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";
// import { timelineStatus } from './Constants';

import * as axios from 'axios';

const timelineStatus = {
  blueButtonConnected: 'connected',
  blueButtonStorageKey: 'bb'
}

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
      token: '',
      connectedToCms: false
    }

    this.mockData = [
      {
        "entry_id": "5a667435852fc30548e37b94",
        "start_date": "2015-03-01",
        "end_date": "2015-03-01",
        "first_icd_code": "S50859D",
        "first_icd_desc": "Superficial foreign body of unspecified forearm, subsequent encounter",
        "provider": "SAYONARA BAEZ"
      },
      {
        "entry_id": "5a667435852fc30548e37b92",
        "start_date": "2015-07-01",
        "end_date": "2015-07-01",
        "provider": "JOHN LIGUSH",
        "first_icd_code": "W5501XA",
        "first_icd_desc": "Bitten by cat, initial encounter"
      },
      {
        "entry_id": "5a667435852fc30548e37b90",
        "start_date": "2014-07-01",
        "end_date": "2014-07-01",
        "first_icd_code": "S82013F",
        "first_icd_desc": "Displaced osteochondral fracture of unspecified patella, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with routine healing",
        "provider": "CHARLENA HARRIS"
      },
      {
        "entry_id": "5a667435852fc30548e37b99",
        "start_date": "2015-03-01",
        "end_date": "2015-03-01",
        "provider": "RYAN CANNON",
        "first_icd_code": "S75911S",
        "first_icd_desc": "Laceration of unspecified blood vessel at hip and thigh level, right leg, sequela"
      },
      {
        "entry_id": "5a667435852fc30548e37bf2",
        "start_date": "2015-04-01",
        "end_date": "2015-04-01",
        "provider": "JENNIFER LAI",
        "first_icd_code": "S63422A",
        "first_icd_desc": "Traumatic rupture of palmar ligament of right middle finger at metacarpophalangeal and interphalangeal joint, initial encounter"
      }
    ];
  }

  componentWillMount() {
    AsyncStorage.multiGet(['userId', 'token', timelineStatus.blueButtonStorageKey]).then((data) => {
      let userId = data[0][1];
      let token = data[1][1];
      let bbConnectionStatus = data[2][1];

      if (bbConnectionStatus && bbConnectionStatus === timelineStatus.blueButtonConnected) {
        this.setState({ connectedToCms: true });
      }

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
    if (!this.state.connectedToCms) {
      return (
        <ListItem itemDivider>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Button rounded style={styles.btn} onPress={() => { this.props.navigation.navigate('BlueButtonScreen') }}>
              <Text>Connect to CMS</Text>
            </Button>

            <Button rounded bordered style={[styles.btn, styles.btnOutline]}>
              <Text style={styles.outlineBtnText}>Connect to other Providers</Text>
            </Button>

          </View>
        </ListItem>
      )
    } else {
      return (
        <View>
          <ListItem>
            <Left>
              <Text style={styles.textLabel} uppercase={true}>Blue Button</Text>
            </Left>
          </ListItem>

          <ListItem itemDivider style={{ maxHeight: 2 }} />

          <ListItem style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <View>
                <Button bordered rounded >
                  <Text uppercase={true}>explanation of benefit</Text>
                </Button>
              </View>
              <View>
              {/* {this.renderEOBTargets(this.mockData)} */}
              </View>

              <View>
                <Button bordered rounded style={{ width: 211, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                  <Text uppercase={true}>providers list</Text>
                </Button>
              </View>
            </View>
          </ListItem>
        </View>
      );
    }
  }

  renderEOBTargets(targetsList) {
    return targetsList.map((target, index) => {
      const topLineStyle = index === 0 ? [timeLineStyles.topLine, timeLineStyles.hiddenLine] : timeLineStyles.topLine;
      const bottomLineStyle = index === targetsList.length ? [timeLineStyles.bottomLine, timeLineStyles.hiddenLine] : timeLineStyles.bottomLine;

      return (
        <View style={timeLineStyles.row} key={target.entry_id}>
          <View style={timeLineStyles.timeline}>
            <View style={timeLineStyles.line}>
              <View style={topLineStyle} />
              <View style={bottomLineStyle} />
            </View>
            <View style={timeLineStyles.dot} />
          </View>

          <View style={styles.content}>
            <View style={{ paddingLeft: 0, borderBottomColor: '#A8A8A8' }}>
              <Body>
                <Text uppercase={true} style={{ padding: 0, fontSize: 14, color: Colors.appBlack }}>{target.provider}</Text>
              </Body>
              <Right>
              </Right>
            </View>
          </View>
        </View>
      );
    });
  }

  getUserData(userId, token) {

    // var that = this;

    // axios.get(`https://www.mycare-api.com/api/v1/user/${userId}/profile`, {
    //   headers: {
    //     'Authorization': token
    //   }
    // }).then((response) => {
    //   let userDetails = response.data;

    //   that.setState({
    //     fetching: false,
    //     firstName: userDetails.firstName,
    //     lastName: userDetails.lastName,
    //     email: userDetails.email,
    //   })
    // }).catch((err) => {

    //   if (err.response.status === 401) {

    //     this.props.navigation.navigate('EmailSignin');
    //     alert(JSON.stringify(err));

    //   } else {
    //     alert('A network error occured');
    //   }
    // })

    // todo remove the following and uncomment the above
    this.setState({
      fetching: false,
      firstName: 'Ayo',
      lastName: 'Akin',
      email: 'ayo@email.com'
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

            {/* <ListItem>
              {this.connectToProviders()}
            </ListItem> */}

            {this.connectToProviders()}

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