import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Container, Content, Text, View, Form, Input, Button, Item } from 'native-base';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/VerificationPinStyle'

import { Images, Metrics, Colors } from "../Themes";


class VerificationPin extends Component {
  constructor (props) {
    super(props)
    this.state = {};

    this.focusNextInput = this.focusNextInput.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    });
    this.input1.wrappedInstance.focus();
  }

  focusNextInput(text, input) {
    if (text.length > 0) {
      input.wrappedInstance.focus();
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#FBFBFB'}}>
        <Content padder>
          <View style={styles.logoContainer} >
            <Text style={styles.logoText}> my<Text style={[styles.logoText, styles.boldText]}>Care. </Text> </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.boldText, styles.themeColor, { fontSize: 20, marginTop: 15 }]}>Verify PIN</Text>
            <Text style={[{ fontSize: 16, marginTop: 15 }]}>Enter pin</Text>

            <View style={{ flexDirection: 'row' }}>
              <View>
                <Item underline>
                  <Input ref={(input) => { this.input1 = input; }} 
                  onChangeText={(text) => {this.focusNextInput(text, this.input2)}}
                  keyboardType='numeric' maxLength={1}/>
                </Item>
                <View style={{ width: 50, borderBottomWidth: 1, borderBottomColor: '#000' }} />

              </View>

              <View style={{ marginLeft: 10 }}>
                <Item underline>
                  <Input onChangeText={(text) => {this.focusNextInput(text, this.input3)}}
                  ref={(input) => { this.input2 = input; }} keyboardType='numeric' maxLength={1}/>
                </Item>
                <View style={{ width: 50, borderBottomWidth: 1, borderBottomColor: '#000' }} />

              </View>

              <View style={{ marginLeft: 10 }}>
                <Item underline>
                  <Input onChangeText={(text) => {this.focusNextInput(text, this.input4)}}
                  ref={(input) => { this.input3 = input; }}keyboardType='numeric' maxLength={1}/>
                </Item>
                <View style={{ width: 50, borderBottomWidth: 1, borderBottomColor: '#000' }} />

              </View>

              <View style={{ marginLeft: 10 }}>
                <Item underline>
                  <Input ref={(input) => { this.input4 = input; }} keyboardType='numeric' maxLength={1} />
                </Item>
                <View style={{ width: 50, borderBottomWidth: 1, borderBottomColor: '#000' }} />

              </View>

            </View>

            <Button rounded style={styles.verifyBtn} onPress={() => {this.props.navigation.navigate('ProfileScreen')}}>
              <Text>VERIFY</Text>
            </Button>
            
            <Button transparent style={{alignSelf: 'center', marginTop: 15}} >
              <Text style={[styles.boldText, {color: '#333'}]} >RESEND PIN</Text>
            </Button>


          </View>



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

export default connect(mapStateToProps, mapDispatchToProps)(VerificationPin)
