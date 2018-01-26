import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ToastAndroid, BackHandler } from 'react-native';
import { Container, Content, List, Text, Icon, Header, Left, Right, Body, Button, Title, Card, CardItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import * as axios from 'axios';
import { Colors } from "../Themes";

class DiagnosticsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            diagnosisData: []
        };
    }

    componentWillMount() {
        this.getDiagnosisData();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.goBack();
          return true
        })
      }

    renderDignosisData() {
        return this.state.diagnosisData.map(data => {
            let created = new Date(data.createdAt);
            let date = created.toLocaleDateString();
            let time = created.toLocaleTimeString();
            return (
                <View key={data._id}>
                    <Card style={{}}>
                        <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <Text style={{ color: '#218EC4', fontWeight: '600', textAlign: 'center' }}>{date}</Text>
                                <Text style={{ fontWeight: '600', fontSize: 12, fontWeight: 'bold', lineHeight: 16, textAlign: 'center' }}>{time}</Text>
                            </View>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16 }}>{data.icd.desc}</Text>
                        </CardItem>
                        <CardItem style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ color: '#218EC4', fontSize: 12, fontWeight: 'bold', lineHeight: 16 }}>{data.icd.code}</Text>
                        </CardItem>
                    </Card>
                    <Separator style={{ height: 5 }} />
                </View>
            );
        });
    }

    getDiagnosisData() {
        let jwtoken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAyQGdtYWlsLmNvbSIsIl9pZCI6IjVhNmEyYzg3NGJkYmEzMDAwNDNkZGJiYyIsImlhdCI6MTUxNjkwNzY2N30.EoZ8aMyTpyw3kK0WyLZK3HpqHSu4BSkscu8RHHB5tPA`;

        axios.get('http://www.mycare-api.com/api/v1/bb/5a677d8e69fe7727942d3062/diagnosis', {
            headers: {
                'Authorization': jwtoken,
                'content-type': 'application/json',
            }
        }).then(response => {
            if (response.data) {
                this.setState({ isFetching: false, diagnosisData: response.data });
            }
        })
            .catch(error => {
                this.setState({ isFetching: false });

                if (error.response.status === 401) {
                    ToastAndroid.show('Unauthorized! You dont have access', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Unknown Network Error!', ToastAndroid.SHORT);
                }
            });
    }

    renderSpinner() {
        if (this.state.isFetching) {
            return <Spinner color="#1C58B5" />
        }
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: Colors.snow }}>
                    <Left>
                        <Button transparent onPress={() => {this.props.navigation.goBack()}}>
                            <Icon name="ios-arrow-back" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000" }}>Diagnostics</Title>
                    </Body>

                </Header>
                <Content padder>
                    <Spinner visible={this.state.isFetching} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    {this.renderDignosisData()}
                </Content>
            </Container>
        );
    }
}

const mapStateToprops = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToprops, mapDispatchToProps)(DiagnosticsScreen);