import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Title } from 'native-base';
import { connect } from 'react-redux';
import { BackHandler, AsyncStorage, View, StyleSheet, ToastAndroid } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";
import * as _ from 'lodash';
import * as axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
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

        this.claimsData = [
            {
                "entry_id": "5a677d8e69fe7727942d3062",
                "start_date": "2014-03-01",
                "end_date": "2014-03-01",
                "first_icd_code": "F3178",
                "first_icd_desc": "Bipolar disorder, in full remission, most recent episode mixed",
                "provider": "RYAN HEILMAN"
            },
            {
                "entry_id": "5a677d8e69fe7727942d305e",
                "start_date": "2015-03-01",
                "end_date": "2015-03-01",
                "first_icd_code": "S72032P",
                "first_icd_desc": "Displaced midcervical fracture of left femur, subsequent encounter for closed fracture with malunion",
                "provider": "JESSICA DENTON"
            },
            {
                "entry_id": "5a677d8e69fe7727942d305c",
                "start_date": "2015-07-01",
                "end_date": "2015-07-01",
                "provider": "FRESENIUS MEDICAL CARE MILFORD, LLC",
                "first_icd_code": "S82202G",
                "first_icd_desc": "Unspecified fracture of shaft of left tibia, subsequent encounter for closed fracture with delayed healing"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3054",
                "start_date": "2014-06-01",
                "end_date": "2014-06-01",
                "first_icd_code": "S00429S",
                "first_icd_desc": "Blister (nonthermal) of unspecified ear, sequela",
                "provider": "JENNIFER EVANS"
            },
            {
                "entry_id": "5a677d8e69fe7727942d305d",
                "start_date": "2015-05-01",
                "end_date": "2015-05-01",
                "provider": "CHELSEA STAVER",
                "first_icd_code": "S45212A",
                "first_icd_desc": "Laceration of axillary or brachial vein, left side, initial encounter"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3055",
                "start_date": "2015-12-01",
                "end_date": "2015-12-01",
                "provider": "",
                "first_icd_code": "S93311S",
                "first_icd_desc": "Subluxation of tarsal joint of right foot, sequela"
            },
            {
                "entry_id": "5a677d8e69fe7727942d305b",
                "start_date": "2015-03-01",
                "end_date": "2015-03-01",
                "first_icd_code": "T7805XS",
                "first_icd_desc": "Anaphylactic reaction due to tree nuts and seeds, sequela",
                "provider": "JOELLE ROTMAN"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3059",
                "start_date": "2015-07-01",
                "end_date": "2015-07-01",
                "provider": "MARCELA COVARRUBIAS",
                "first_icd_code": "R29723",
                "first_icd_desc": "NIHSS score 23"
            },
            {
                "entry_id": "5a677d8e69fe7727942d305a",
                "start_date": "2014-07-01",
                "end_date": "2014-07-01",
                "first_icd_code": "Y37291D",
                "first_icd_desc": "Military operations involving other explosions and fragments, civilian, subsequent encounter",
                "provider": "TAMPA ACTIVE HEALTH LLC"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3063",
                "start_date": "2015-03-01",
                "end_date": "2015-03-01",
                "provider": "KATHLEEN BALINT",
                "first_icd_code": "T621X1D",
                "first_icd_desc": "Toxic effect of ingested berries, accidental (unintentional), subsequent encounter"
            },
            {
                "entry_id": "5a677d8e69fe7727942d30bc",
                "start_date": "2015-04-01",
                "end_date": "2015-04-01",
                "provider": "JANELLA UWADIA",
                "first_icd_code": "M62029",
                "first_icd_desc": "Separation of muscle (nontraumatic), unspecified upper arm"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3051",
                "start_date": "2015-03-01",
                "end_date": "2015-03-01",
                "first_icd_code": "S92102A",
                "first_icd_desc": "Unspecified fracture of left talus, initial encounter for closed fracture",
                "provider": "SUNNYWOOD ACUPUNCTURE P.C."
            },
            {
                "entry_id": "5a677d8e69fe7727942d3058",
                "start_date": "2015-07-01",
                "end_date": "2015-07-01",
                "provider": "DEDICATED PENNSYLVANIA HOLDING, LLC",
                "first_icd_code": "S62334K",
                "first_icd_desc": "Displaced fracture of neck of fourth metacarpal bone, right hand, subsequent encounter for fracture with nonunion"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3064",
                "start_date": "2014-03-01",
                "end_date": "2014-03-01",
                "first_icd_code": "S6422XA",
                "first_icd_desc": "Injury of radial nerve at wrist and hand level of left arm, initial encounter",
                "provider": "BAOQIONG LIU"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3056",
                "start_date": "2014-06-01",
                "end_date": "2014-06-01",
                "provider": "STEPHANIE PAWLENKO",
                "first_icd_code": "S66509A",
                "first_icd_desc": "Unspecified injury of intrinsic muscle, fascia and tendon of unspecified finger at wrist and hand level, initial encounter"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3053",
                "start_date": "2015-03-01",
                "end_date": "2015-03-01",
                "provider": "KAITLYN DANNIBALE",
                "first_icd_code": "T82520D",
                "first_icd_desc": "Displacement of surgically created arteriovenous fistula, subsequent encounter"
            },
            {
                "entry_id": "5a677d8e69fe7727942d30bb",
                "start_date": "2015-04-01",
                "end_date": "2015-04-01",
                "provider": "LILIAM ALEA GARCIA",
                "first_icd_code": "N99115",
                "first_icd_desc": "Postprocedural fossa navicularis urethral stricture"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3065",
                "start_date": "2015-05-01",
                "end_date": "2015-05-01",
                "first_icd_code": "S82035S",
                "first_icd_desc": "Nondisplaced transverse fracture of left patella, sequela",
                "provider": "DAVID GRUNOW"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3061",
                "start_date": "2015-09-01",
                "end_date": "2015-09-01",
                "first_icd_code": "S62348A",
                "first_icd_desc": "Nondisplaced fracture of base of other metacarpal bone, initial encounter for closed fracture",
                "provider": "ANDREA HOGSTAD"
            },
            {
                "entry_id": "5a677d8e69fe7727942d304f",
                "start_date": "2014-05-01",
                "end_date": "2014-05-01",
                "first_icd_code": "S52515R",
                "first_icd_desc": "Nondisplaced fracture of left radial styloid process, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with malunion",
                "provider": "KATHRYN ABEBE"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3050",
                "start_date": "2014-05-01",
                "end_date": "2014-05-01",
                "first_icd_code": "S61509A",
                "first_icd_desc": "Unspecified open wound of unspecified wrist, initial encounter",
                "provider": "BH-SD RX, LLC"
            },
            {
                "entry_id": "5a677d8e69fe7727942d304d",
                "start_date": "2015-04-01",
                "end_date": "2015-04-01",
                "first_icd_code": "S76892A",
                "first_icd_desc": "Other injury of other specified muscles, fascia and tendons at thigh level, left thigh, initial encounter",
                "provider": "ALLISON MCCULLOUGH"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3057",
                "start_date": "2015-12-01",
                "end_date": "2015-12-01",
                "first_icd_code": "T3442XD",
                "first_icd_desc": "Frostbite with tissue necrosis of left arm, subsequent encounter",
                "provider": "JOHN SUTTER"
            },
            {
                "entry_id": "5a677d8e69fe7727942d305f",
                "start_date": "2014-12-01",
                "end_date": "2014-12-01",
                "first_icd_code": "W2104XA",
                "first_icd_desc": "Struck by golf ball, initial encounter",
                "provider": "JORDAN LO"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3052",
                "start_date": "2015-07-01",
                "end_date": "2015-07-01",
                "provider": "JEFFERSON WHINERY",
                "first_icd_code": "S60041S",
                "first_icd_desc": "Contusion of right ring finger without damage to nail, sequela"
            },
            {
                "entry_id": "5a677d8e69fe7727942d3060",
                "start_date": "2014-10-01",
                "end_date": "2014-10-01",
                "first_icd_code": "S62628S",
                "first_icd_desc": "Displaced fracture of medial phalanx of other finger, sequela",
                "provider": "MICHELLE ZYGIELBAUM"
            },
            {
                "entry_id": "5a677d8e69fe7727942d304e",
                "start_date": "2015-06-01",
                "end_date": "2015-06-01",
                "first_icd_code": "M05862",
                "first_icd_desc": "Other rheumatoid arthritis with rheumatoid factor of left knee",
                "provider": "JUSTIN LITTLEDIKE"
            }
        ];

        this.months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
    }

    componentWillMount() {
        let jwtoken = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15Y2FyZS11c2VyMkBnbWFpbC5jb20iLCJfaWQiOiI1YTYxMTNiYmVmOThmODEwOTAwNWQ4MmMiLCJpYXQiOjE1MTYzMTE2NTB9.UN1b6qYGD_0q7w52jUzPUgpIEtUNwEntdYM_MDhSRco`;
        let postmanToken = 'b8642fc3-ad6b-4da6-cfc4-5e424ad2c0cc';

        // this.getTimeLineData(jwtoken, postmanToken);
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
                // this.setState({ 
                //     isFetching: false,
                //     claimsData: response.data
                //  });

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
        let timeLineData = this.claimsData.groupBy('start_date');

        let claimsData = [];

        Object.keys(timeLineData).reverse().forEach(start_date => {
            let date = new Date(start_date);
            let year =  date.getFullYear();
            claimsData.push(
                <View>
                    <ListItem itemDivider style={{ borderBottomColor: '#A8A8A8', borderTopColor: '#A8A8A8', borderBottomWidth: 1, borderTopWidth: 1 }}>
                        <Text>{year}</Text>
                    </ListItem>
                    {this.renderData(timeLineData[start_date])}
                </View>
            );
        });

        return claimsData;
    }
    renderData(dataCategories) {

        return dataCategories.map((category, index) => {
            const topLineStyle = index === 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
            const bottomLineStyle = index === (dataCategories.length - 1) ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;
            let date = new Date(category.start_date);
            let month = this.months[date.getMonth()];

            return (
                <View style={styles.row} key={category.name}>
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
                                <Text uppercase={true} style={{ padding: 0, fontSize: 14, color: Colors.appBlack }}>{category.first_icd_code}</Text>
                                <Text numberOfLines={1} uppercase={false} style={{ fontSize: 18, color: Colors.appBlack }}>{category.provider}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 14, color: Colors.appBlack }} uppercase={false}>{category.first_icd_desc}</Text>
                            </Body>
                            <Right>
                                <Text note uppercase={true} numberOfLines={1}>
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
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")} >
                            <Icon name="ios-menu" style={{ color: '#000' }} />
                        </Button>

                    </Left>

                    <Body>
                        <Title style={{ color: Colors.coal }}>Claims Data</Title>
                    </Body>

                    <Right />

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
        width: 2,
        backgroundColor: '#A8A8A8',
    },
    bottomLine: {
        flex: 1,
        width: 2,
        backgroundColor: '#A8A8A8',
    },
    hiddenLine: {
        width: 0,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#1C58B5',
    },
});