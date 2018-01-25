import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, Title, Icon, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/UploadScreenStyle'
import { Images, Metrics, Colors } from "../Themes";

class UploadsScreen extends Component {

  constructor(props) {
    super(props)

    const uploads = [

    ]
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }
  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: Colors.snow }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" style={{ color: "#000" }} />
            </Button>
          </Left>
          <Body>
            <Title>UploadsScreen</Title>
          </Body>
          <Right />

        </Header>

        <Content padder>
          <Text>UploadsScreen Content</Text>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadsScreen)