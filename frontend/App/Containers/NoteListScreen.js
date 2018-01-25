import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, View, Title, List, ListItem, Icon,Separator, Fab } from 'native-base';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NoteListScreenStyle'
import { Images, Metrics, Colors } from "../Themes";


class NoteListScreen extends Component {

  constructor(props) {
    super(props)

    const notes = [
      {
        title: 'LOREM IPSUM',
        excerpt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorAenean mas...',
        time: '3hrs'
      },
      {
        title: 'LOREM IPSUM',
        excerpt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorAenean mas...',
        time: '2 days'
      },
      {
        title: 'LOREM IPSUM',
        excerpt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorAenean mas...',
        time: 'Jan 21'
      }
    ]

    this.state = {
      fabActive: 'true',
      notes: notes
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  renderNote(note) {
    return (
      <View>
      <Separator style={{height: 5}}>
            {/* <Text>FORWARD</Text> */}
      </Separator>
      <ListItem style={styles.item}>
        {/* <Left> */}
        <View style={styles.dot}></View>
        {/* </Left> */}
        <View>
          <View style={styles.itemHeader}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.time}>{note.time}</Text>
          </View>
          <Text style={styles.excerpt}>{note.excerpt}</Text>
        </View>
      </ListItem>
      </View>
    )
  }

  render() {
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
            <Title style={{ color: "#000" }}>Notes</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="md-more" style={{ color: "#000" }} />
            </Button>
          </Right>

        </Header>

        <Content>
          <List style={{ backgroundColor: '#FFF' }} dataArray={this.state.notes} renderRow={
            (note) => this.renderNote(note)}>
          </List>
        </Content>

        {/* <View style={{ flex: 1 }}>
          <Fab
            active={this.state.fabActive}
            direction="up"
            // containerStyle={{}}
            style={{ backgroundColor: '#3399CC' }}
            position="bottomRight"
            // onPress={() => this.setState({ active: !this.state.fabActive })}
            >

            <Icon name="md-add" />

            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>

          </Fab>
        </View> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(NoteListScreen)