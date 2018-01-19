import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Content, Container, Header, Left, Right, Body, View, Button, Text, Title, Icon, List, ListItem, CheckBox, Input } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import { Image } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";


class ProfileScreen extends Component {

  constructor(props) {
    super(props)

    const providers = [
      { name: 'Cigna', connected: false },
      { name: 'UnitedHealth', connected: false },
      { name: 'BlueCross', connected: false },
      { name: 'Providence', connected: true },
      { name: 'CMS', connected: true }
    ];


    this.state = {
      dataSource: providers
    }



  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
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

          <Image resizeMode="contain" source={Images.userIcon} style={styles.profileImage} />

          <List style={{ backgroundColor: '#FFFFFF' }}>

            <ListItem>
              <Left>
                <Text style={styles.textLabel}>NAME</Text>
              </Left>

              <Text style={styles.textValue} >Larry Jones</Text>

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

              <Text style={styles.textValue} >09/29/1943</Text>
            </ListItem>

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >RACE</Text>
              </Left>

              <Text style={styles.textValue} >Hispanic</Text>
            </ListItem>

            <ListItem itemDivider />

            <ListItem>
              <Left>
                <Text style={styles.textLabel} >EMAIL</Text>
              </Left>

              <Text style={styles.textValue} >l.jones@email.com</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)