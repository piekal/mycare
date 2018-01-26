import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, Title, Icon, List, ListItem, CheckBox } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProviderListScreenStyle'
import { Images, Metrics, Colors } from "../Themes";

class ProviderListScreen extends Component {

  constructor(props) {
    super(props)

    const providers = [
      // { name: 'Cigna', connected: false },
      // { name: 'UnitedHealth', connected: false },
      // { name: 'BlueCross', connected: false },
      // { name: 'Providence', connected: true },
      { name: 'CMS', connected: false }
    ];


    this.state = {
      dataSource: providers
    }

    this.connect = this.connect.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  connect() {
    this.props.navigation.navigate('BlueButtonScreen');
  }

  renderProviders(provider) {
    if (!provider.connected) {
      return (
        <ListItem style={{ marginLeft: 0 }} >
          <Left>
            <Text style={[styles.bold, styles.font16]} >{provider.name}</Text>
          </Left>
          <Button bordered rounded style={styles.btn}>
            <Text onPress={this.connect} style={styles.btnText}>CONNECT</Text>
          </Button>
        </ListItem>)
    } else {
      return (
        <ListItem style={{ marginLeft: 0 }} >
          <Left>
            <Text style={[styles.bold, styles.font16]}>{provider.name}</Text>
          </Left>

          <Button rounded style={styles.btn}>
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
            <Button onPress={() => this.props.navigation.dispatch(NavigationActions.back())} transparent>
              {/*<Icon name="ios-arrow-back" style={{ color: "#000" }} />*/}
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }} >Payers</Title>
          </Body>
          <Right>
            <Button transparent>
              {/*<Text style={{ color: "#000" }}>DONE</Text>*/}
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
