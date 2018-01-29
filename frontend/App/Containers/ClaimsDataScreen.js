import React, { Component } from 'react'
import { BackHandler, Image, NavigationActions, Alert, TouchableOpacity } from 'react-native'
import { Content, Container, Header, Left, Right, Body, View, Button, Text, Title, Icon, List, ListItem } from 'native-base'
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion'
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'


// Styles
import styles from './Styles/ClaimsDataScreenStyle'
import { Images, Metrics, Colors } from "../Themes";

const PANELS = [
  {
    get header() {
      return (

        <View style={[styles.headerContainer, { flex: 1 }]}>

          <View style={styles.headerLeft}>

            <Image source={Images.procedures} />
            <Text style={{ paddingLeft: 10 }}>PROCEDURES</Text>

          </View>

          <View>
            <Icon name='ios-arrow-forward' style={{ color: '#000' }} />
          </View>

        </View>

      )
    },
    get content() {
      return (

        <View>
          <Text>PROCEDURES</Text>
        </View>

      )
    }

  },
  {
    get header() {
      return (

        <View style={[styles.headerContainer, { flex: 1 }]}>

          <View style={styles.headerLeft}>

            <Image source={Images.cost} />
            <Text style={{ paddingLeft: 10 }}>COST</Text>

          </View>

          <View>
            <Icon name='ios-arrow-down' style={{ color: '#000' }} />
          </View>

        </View>

      )
    },
    get content() {
      return (

        <View>

          <View style={[styles.rowCenter, { borderBottomWidth: 1, borderBottomColor: '#E6E7E8' }]}>

            <View style={styles.center}>
              <Text style={[styles.boldText, styles.font14]}>PAID</Text>
              <Text style={[styles.boldText, styles.textGreen]}>$200.00</Text>
            </View>

            <View style={styles.center}>
              <Text style={[styles.boldText, styles.font14]}>COVERED</Text>
              <Text style={[styles.boldText, styles.textRed]} >$15000.00</Text>
            </View>

            <View style={styles.center}>
              <Text style={[styles.boldText, styles.font14]}>BALANCE</Text>
              <Text style={[styles.boldText, styles.textRed]}>$300.00</Text>
            </View>


          </View>

          <View style={{ marginTop: 15 }}>

            <View style={styles.rowCenter}>

              <View style={styles.center}>
                <Text style={styles.font14}>BILL STATUS</Text>
                <Text style={[styles.boldText, { fontSize: 22 }]}>90%</Text>
              </View>

              <View style={styles.center}>
                <Text style={[styles.font14]}>TRANSACTION STATUS</Text>
                <Progress.Bar progress={0.75} width={100} color={'#20B06A'} style={{ marginTop: 20, marginBottom: 15 }} />
              </View>

            </View>

            <Button bordered rounded style={{ alignSelf: 'center', marginTop: 15 }}>
              <Text>DETAILS</Text>
            </Button>

          </View>

        </View>

      )
    }

  },
  {
    get header() {
      return (

        <View style={[styles.headerContainer, { flex: 1 }]}>

          <View style={styles.headerLeft}>

            <Image source={Images.prescription} />
            <Text style={{ paddingLeft: 10 }}>PRESCRIPTION</Text>

          </View>

          <View>
            <Icon name='ios-arrow-forward' style={{ color: '#000' }} />
          </View>

        </View>

      )
    },
    get content() {
      return (

        <View>
          <Text>PRESCRIPTION</Text>
        </View>

      )
    }

  },
  {
    get header() {
      return (

        <View style={[styles.headerContainer, { flex: 1 }]}>

          <View style={styles.headerLeft}>

            <Image source={Images.notes} />
            <Text style={{ paddingLeft: 10 }}>NOTES</Text>

          </View>

          <View>
            <Icon name='ios-arrow-forward' style={{ color: '#000' }} />
          </View>

        </View>

      )
    },
    get content() {
      return (

        <View>
          <Text>NOTES</Text>
        </View>

      )
    }

  }
]

// const PANELS = [
//   {
//     title: 'DIAGNOSTICS',
//     content: 'Hello'
//   }
// ]
class ClaimsDataScreen extends Component {

  constructor(props) {
    super(props)


    this.state = {
      activeSection: 0,
    }
  }



  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  closeAccordion = () => {
    this.setState({ activeSection: false });
  };


  renderPanelHeader(panel) {
    return (

      <View style={styles.headerContainer}>

        {panel.header}

      </View>
    )
  }

  renderPanelContent(panel) {
    return (
      <View style={{ padding: 10, backgroundColor: '#F5F5F5' }}>
        {panel.content}
      </View>
    )
  }

  render() {
    return (
      <Container>
        
        <Header style={{ backgroundColor: Colors.snow }}>
          <Left>
            <Button transparent onPress={() => { this.props.navigation.navigate('EOBClaimScreen'); }}>
              <Icon name="ios-arrow-back" style={{ color: "#000" }} />
            </Button>
          </Left>
          
          <Body>
            <Title style={{ color: '#000' }}>ClaimsData</Title>
          </Body>

          <Right>
            <Icon name='ios-search' />
          </Right>

        </Header>

        <Content>
          {/* Todo remote the following view after the demo or retain as required */}
          <View style={[styles.headerContainer, { flex: 1 }]}>
            <TouchableOpacity style={[styles.headerContainer, { flex: 1}]} onPress={() => { this.props.navigation.navigate('DiagnosticScreen'); }}>
            <View style={styles.headerLeft}>

              <Image source={Images.diagnostic} />
              <Text style={{ paddingLeft: 10 }}>DIAGNOSTICS</Text>

            </View>

            <View>
              <Icon name='ios-arrow-forward' style={{ color: '#000' }} />
            </View>
            </TouchableOpacity>

          </View>

          <Accordion
            sections={PANELS}
            onChange={activeSection => this.setState({ activeSection })}
            // activeSection={this.state.activeSection}
            disabled={true}
            renderHeader={this.renderPanelHeader}
            renderContent={this.renderPanelContent}
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsDataScreen)
