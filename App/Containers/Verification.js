import React, { Component } from 'react'
import { BackHandler, Image } from 'react-native'
import { Container, Content, Text, View, Picker, Form, PItem as FormItem, Input, Item, Button } from 'native-base';
const PItem = Picker.Item;
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/VerificationStyle'

import { Images, Metrics, Colors } from "../Themes";


class Verification extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     phoneNo: 123445566
  //   }
  // }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }


  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.logoContainer} >
            <Text style={styles.logoText}> my<Text style={[styles.logoText, styles.boldText]}>Care. </Text> </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={[styles.themeColor, styles.boldText, styles.f18]} >Verify your phone Number</Text>

            <Text style={[styles.themeColor,{textAlign: 'center', paddingBottom: 10}]}> my<Text style={[styles.themeColor, styles.boldText]}>Care </Text>
              <Text>will send an SMS message to verify your phone number. Enter your country code and phone numnber</Text>
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Picker
                mode="dropdown"
                style={{ width: 200 }}
              // selectedValue={this.state.selected1}
              // onValueChange={this.onValueChange.bind(this)}
              >
                <PItem label="United States" value="key0" />
              </Picker>
              <View style={{ width: 250, borderBottomWidth: 1, borderBottomColor: '#000' }} />

              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Item underline>
                    <Input placeholder="+1" keyboardType='phone-pad' value='+1' />
                  </Item>
                  <View style={{ width: 50, borderBottomWidth: 1, borderBottomColor: '#000' }} />

                </View>

                <View style={{ marginLeft: 10 }}>
                  <Item>
                    <Input
                      keyboardType='phone-pad'
                    // onChangeText={(text)=> this.phoneInput(text)}
                    />
                  </Item>
                  <View style={{ width: 200, borderBottomWidth: 1, borderBottomColor: '#000' }} />

                </View>
              </View>

            </View>

          </View>

          <Button rounded style={styles.nxtBtn}>
            <Text>NEXT</Text>
          </Button>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(Verification)
