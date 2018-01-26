import React, { Component } from 'react'
import { Platform, AsyncStorage, StyleSheet, Linking, Alert } from 'react-native'
import { AppState, BackHandler } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, Title, Icon, List, ListItem, CheckBox } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProviderListScreenStyle'
import { Images, Metrics, Colors } from "../Themes";

class ProviderListScreen extends React.PureComponent {

  constructor(props) {
    super(props)

    const providers = [
      // { name: 'Cigna', connected: false },
      // { name: 'UnitedHealth', connected: false },
      // { name: 'BlueCross', connected: false },
      // { name: 'Providence', connected: true },
      { name: 'CareEvolution', connected: false }
    ];


    this.state = {
      dataSource: providers
    }

    this.connect = this.connect.bind(this);

    this.redirectToBrowser = this.redirectToBrowser.bind(this);
    
    this.authUrl = `https://fhir.careevolution.com/Master.Adapter1.WebClient/OAuth2/Authorize?response_type=code&client_id=adc97029-f891-4931-ad16-2a311c76076d&redirect_uri=mycare://careevolution/callback&scope=patient/*.read&state=s06Up0SpUg&aud=https://fhir.careevolution.com/Master.Adapter1.WebClient/api/fhir`;

  }

  componentDidMount() {
    console.log("provider did mount");
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    });

    AppState.addEventListener('change', this._handleAppStateChange);

  }

  _handleAppStateChange = (nextAppState) => {

    console.log(nextAppState);
    if (nextAppState == 'background') {
      console.log('App has moved to the background!');
    }
    
    if (this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      if (Platform.OS === 'android') {
        Linking.getInitialURL().then(url => {
          this.navigate(url);
        });
      }      
    }

    this.setState({appState: nextAppState});
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation;
    // const route = url && url.replace(/.*?:\/\//g, '');
    // const id = route && route.match(/\/([^\/]+)\/?$/)[1];
    // const routeName = route && route.split('/')[0];

    console.log(url);
  }


  connect() {
    this.props.navigation.navigate('BlueButtonScreen');
  }

  redirectToBrowser() {
    Linking.openURL(this.authUrl);
  }
  
  renderProviders(provider) {
    if (!provider.connected) {
      return (
        <ListItem style={{ marginLeft: 0 }} >
          <Left>
            <Text style={[styles.bold, styles.font16]} >{provider.name}</Text>
          </Left>
          <Button bordered rounded style={[styles.btn, styles.btnOutline]}>
            <Text style={styles.btnText}>CONNECT</Text>
          </Button>
        </ListItem>)
    } else {
      return (
        <ListItem style={{ marginLeft: 0 }} >
          <Left>
            <Text style={[styles.bold, styles.font16]}>{provider.name}</Text>
          </Left>

          <Button rounded style={[styles.btn, styles.btnFill]}>
            <Text style={styles.btnConnectedTxt}>CONNECTED</Text>
          </Button>
        </ListItem>
      )
    }
  }
  render() {
    return (
      <Container>

        <Header style={{ backgroundColor: Colors.snow }}>
          <Left>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="ios-arrow-back" style={{ color: "#000" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }}>Providers</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text style={{ color: Colors.appBlue }}>DONE</Text>
            </Button>
          </Right>

        </Header>

        <Content padder style={{backgroundColor: '#FFF'}}>

          <List dataArray={this.state.dataSource} renderRow={
            (provider) => this.renderProviders(provider)
            
          }>
          </List>

        </Content>

      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProviderListScreen)