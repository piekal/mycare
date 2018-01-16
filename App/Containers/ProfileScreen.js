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
      { name: 'CMS', connected: true}
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
  render() {

    return (
      <Container>
        <Header style={{ backgroundColor: '#FFF' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")} >
              <Icon name="ios-menu" style={{color: '#000'}} />
            </Button>

          </Left>

          <Body>
            <Title style={{ color: Colors.coal }}>Profile</Title>
          </Body>

          <Right />

        </Header>

        <Content style={{backgroundColor: '#E4E4E4'}} >

          <Image resizeMode="contain" source={Images.userIcon} style={styles.profileImage} />

          <List style={{backgroundColor: '#FFFFFF'}}>
            
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
                <Icon name='ios-arrow-forward' style={{color: '#000'}} />
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
                style={[styles.textValue, {flex: 1, width: 50}]}
								value={"password"}
								editable={false}
								secureTextEntry
								underlineColorAndroid="transparent"
							/>
              </Right>
            </ListItem>

            <ListItem itemDivider />

            <ListItem>
              <List dataArray={this.state.dataSource} renderRow={
                (provider) => {
                  if (!provider.connected) {
                    return (
                      <ListItem style={{marginLeft: 0}} >
                        <Left>
                          <Text style={[styles.textValue, styles.font14]} >{provider.name}</Text>
                        </Left>
                        <Button bordered style={styles.btn}>
                          <Text style={styles.btnText}>CONNECT</Text>
                        </Button>
                      </ListItem>)
                  } else {
                    return (
                      <ListItem style={{marginLeft: 0}} >
                        <Left>
                          <Text style={[styles.textValue, styles.font14]}>{provider.name}</Text>
                        </Left>

                        <CheckBox checked={true} color={'#1FC26B'} />
                      </ListItem>
                    )
                  }
                }
              }>
              </List>
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