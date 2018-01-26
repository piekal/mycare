import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Title } from 'native-base';
import { connect } from 'react-redux';
import { BackHandler, AsyncStorage, View, StyleSheet, ToastAndroid } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";
import * as _ from 'lodash';
import * as axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

Array.prototype.groupByYear = function (prop) {
    return this.reduce(function (groups, item) {
        let dateString = item[prop];
        let year = dateString.substr(0, 4);
        groups[year] = groups[year] || [];
        groups[year].push(item);
        return groups;
    }, {});
}



class EOBClaimScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            claimsData: []
        }

        this.months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
    }

    componentWillMount() {
        let jwtoken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15Y2FyZS11c2VyMkBnbWFpbC5jb20iLCJfaWQiOiI1YTYxMTNiYmVmOThmODEwOTAwNWQ4MmMiLCJpYXQiOjE1MTYzMTE2NTB9.UN1b6qYGD_0q7w52jUzPUgpIEtUNwEntdYM_MDhSRco`;
        let postmanToken = 'b8642fc3-ad6b-4da6-cfc4-5e424ad2c0cc';

        this.getTimeLineData(jwtoken, postmanToken);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        });
    }

    getTimeLineData(jwtoken, postmanToken) {
        this.setState({ isFetching: true });

        axios.get('https://www.mycare-api.com/api/v1/bb/timeline', {
            headers: {
                'Authorization': jwtoken,
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'postman-token': postmanToken
            }
        }).then(response => {
            if (response.data) {
                console.log('successfull');
                this.setState({
                    isFetching: false,
                    claimsData: response.data
                });

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

    renderClaimsData() {
        let timeLineData = this.state.claimsData.groupByYear('start_date');

        let claimsData = [];

        Object.keys(timeLineData).reverse().forEach(start_date => {
            let date = new Date(start_date);
            let year = date.getFullYear();
            claimsData.push(
                <View key={year}>
                    <ListItem itemDivider style={{ borderBottomColor: '#BDBDBD', borderTopColor: '#BDBDBD', borderBottomWidth: 1, borderTopWidth: 1 }}>
                        <Text>{year}</Text>
                    </ListItem>
                    {this.renderData(timeLineData[start_date])}
                </View>
            );
        });

        return claimsData;
    }
    renderData(dataCategories) {
        dataCategories = _.orderBy(dataCategories, ['start_date'], ['asc'])

        return dataCategories.map((category, index) => {
            const topLineStyle = index === 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
            const bottomLineStyle = index === (dataCategories.length - 1) ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;
            let date = new Date(category.start_date);
            let month = this.months[date.getMonth()];

            return (
                <View style={styles.row} key={category.entry_id}>
                    <View style={styles.timeline}>
                        <View style={styles.line}>
                            <View style={topLineStyle} />
                            <View style={bottomLineStyle} />
                        </View>
                        <View style={styles.dot} />
                    </View>

                    <View style={styles.content}>
                        <ListItem style={{ paddingLeft: 0, borderBottomColor: '#A8A8A8' }}>
                            <Body>
                                <Text uppercase={true} style={{ padding: 0, fontWeight: '600', fontSize: 10, color: '#333333' }}>{category.first_icd_code}</Text>
                                <Text numberOfLines={1} uppercase={false} style={{ fontSize: 14, lineHeight: 16, fontWeight: '600', color: '#333333' }}>
                                    {category.provider}
                                </Text>
                                <Text numberOfLines={1} style={{ fontSize: 12, lineHeight: 16, fontWeight: 'normal', color: '#333333' }} uppercase={false}>{category.first_icd_desc}
                                </Text>
                            </Body>
                            <Right>
                                <Text note uppercase={true} numberOfLines={1} style={{ fontSize: 10, fontWeight: 'bold', lineHeight: 16, color: '#6E6B6B', marginTop: -24 }}>
                                    {month}
                                </Text>

                            </Right>
                        </ListItem>
                    </View>
                </View>
            );
        })
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#FFF' }}>
                    <Left style={{ flex: 2 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon name="arrow-back" style={{ color: '#000' }} />
                        </Button>

                    </Left>

                    <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 6 }}>
                        <Title style={{ color: Colors.coal, textAlign: 'center', alignSelf: 'center' }}>Claims Data</Title>
                    </Body>

                    <Right style={{ flex: 2 }}>
                        <Button transparent>
                            <Icon name="md-add" style={{ color: '#000' }} />
                        </Button>
                    </Right>

                </Header>

                <Content style={{ backgroundColor: '#FBFBFB' }}>
                    <Spinner visible={this.state.isFetching} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <List>
                        {this.renderClaimsData()}
                    </List>
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // fetching: state.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EOBClaimScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row: {
        padding: 0,
        paddingLeft: 0,
    },
    content: {
        marginLeft: 20,
    },
    timeline: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 40,
        justifyContent: 'center', // center the dot
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 18,
        width: 4,
        bottom: 0,
    },
    topLine: {
        flex: 1,
        width: 1,
        backgroundColor: '#BDBDBD',
        alignSelf: 'center'
    },
    bottomLine: {
        flex: 1,
        width: 1,
        backgroundColor: '#BDBDBD',
        alignSelf: 'center'
    },
    hiddenLine: {
        width: 0,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: Colors.appBlue,
        alignSelf: 'center'
    },
});