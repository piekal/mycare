import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import { Container, Content, List, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { timelineStatus } from '../Shared/constants';

class BlueButtonScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true
        };
    }

    componentWillMount() {
          let jwtoken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15Y2FyZS11c2VyMkBnbWFpbC5jb20iLCJfaWQiOiI1YTYxMTNiYmVmOThmODEwOTAwNWQ4MmMiLCJpYXQiOjE1MTYzMTE2NTB9.UN1b6qYGD_0q7w52jUzPUgpIEtUNwEntdYM_MDhSRco`;
          let postmanToken = 'b236d560-0ce8-d261-5c72-3864dc00c7b6';

          this.getEOBStatus(jwtoken, postmanToken);
    }

    getEOBStatus(jwtoken, postmanToken) {
        axios.get('https://www.mycare-api.com/api/v1/bb/status',{
            headers: {
                'Authorization': jwtoken,
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'postman-token': postmanToken
              }
        }).then(response => {
            if (response.data === 'EOB_READY') {
                this.setState({isFetching: false});

                AsyncStorage.setItem(timelineStatus.blueButtonStorageKey, timelineStatus.blueButtonConnected);

                this.props.navigation.navigate('ProfileScreen');
            }
        })
        .catch(error => {
            this.setState({isFetching: false});

            if(error.response.status === 401) {
                ToastAndroid.show('Unauthorized! You dont have access', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Unknown Network Error!', ToastAndroid.SHORT);
            }
        });
    }

    renderSpinner() {
        if (this.state.isFetching) {
            return <Spinner color="#1C58B5"/>
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} style={{ backgroundColor: '#FBFBFB' }}>
                    <Text style={styles.textStyle}>BLUE BUTTON</Text>
                    <Text style={styles.textStyle}>ENDPOINT</Text>
                    {this.renderSpinner()}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 36,
        lineHeight: 49,
        color: '#1C58B5',
        fontWeight: '600'
    }
});

const mapStateToprops = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToprops, mapDispatchToProps)(BlueButtonScreen);