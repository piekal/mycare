import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, BackHandler } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Icon, Thumbnail } from 'native-base';
import SigninScreenStyles from './Styles/SigninScreenStyles';
import BackgroundImage from '../Components/BackgroundImage';

class EmailSigninScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailDirty: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        })
    }

    get emailIsvalid() {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(this.state.email.trim());
    }

    get emailIsInvalid() {
        return !this.emailIsvalid && this.state.emailDirty;
    }

    get formIsValid() {
        return this.emailIsvalid;
    }

    showEmailErrorMsg() {
        if (this.state.emailDirty && !this.emailIsvalid) {
            return (
                <Item style={{ borderBottomColor: '#FBFBFB', alignSelf: 'center' }}>
                    <Text style={{
                        color: '#F25050', fontSize: 11, lineHeight: 14,
                        textAlign: 'center'
                    }}>
                        Please input a valid email
                    </Text>
                </Item>
            );
        }
    }

    renderEmailForm() {
        return (
            <View style={{ flex: 6, justifyContent: 'space-between', paddingVertical: 70 }}>


                <View style={[{ alignItems: 'center' }]}>
                    <Thumbnail large source={Images.ignite} />
                </View>


                <Item style={[SigninScreenStyles.inputField, this.emailIsvalid && SigninScreenStyles.inputValid, this.emailIsInvalid && SigninScreenStyles.inputInvalid]} stackedLabel>
                    <Label style={[SigninScreenStyles.floatingLabel, this.emailIsvalid && SigninScreenStyles.labelValid,
                    this.emailIsInvalid && SigninScreenStyles.labelInvalid, { alignSelf: 'center' }]}>
                        Email / Phone No.
                    </Label>
                    <Input placeholderTextColor="#A8A8A8" style={[SigninScreenStyles.textInput]}
                        onChangeText={(text) => this.setState({ email: text, emailDirty: true })} value={this.state.email} />
                </Item>


                {this.showEmailErrorMsg()}


            </View>
        );
    }

    renderContinueButton() {
        let formInvalidBtn = (<Button rounded iconRight style={[SigninScreenStyles.buttonFormInvalid]}>
            {/* <Icon name='arrow-forward' /> */}
            <Text style={{ color: '#333333', fontSize: 16, lineHeight: 20 }} uppercase={true}>Next</Text>
        </Button>);

        let formValidBtn = (
            <Button rounded iconRight style={[SigninScreenStyles.buttonFormValid]}
                onPress={() => { this.props.navigation.navigate('PasswordSignin', { signInEmail: this.state.email }) }}>
                {/* <Icon name='arrow-forward' /> */}
                <Text style={{ color: '#FBFBFB', fontSize: 16, lineHeight: 20 }} uppercase={true}>Next</Text>
            </Button>
        );

        return this.formIsValid ? formValidBtn : formInvalidBtn;
    }

    render() {
        return (
            <Container >
                <BackgroundImage>
                    <Content contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 10, paddingVertical: 60, justifyContent: 'space-between'
                    }}>
                        <View style={{ flex: 1.5 }}>
                            <Text style={{ color: Colors.appBlue, fontSize: 24, lineHeight: 32, textAlign: 'center' }}>
                                my<Text style={{ fontWeight: 'bold', color: Colors.appBlue, fontSize: 24, lineHeight: 32 }}>Care.</Text>
                            </Text>
                        </View>

                        {this.renderEmailForm()}{/*note form has Flex: 6*/}

                        <View style={{ flex: 2.5, justifyContent: 'space-between' }}>
                            <Item style={{ alignItems: 'center', justifyContent: 'center', borderBottomColor: '#FBFBFB', flex: 0.5 }}>
                                {this.renderContinueButton()}
                            </Item>

                            <View style={{ flex: 0.5, marginTop: 15, borderBottomColor: '#FBFBFB', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Dont have an Account?
                            <Text onPress={() => { this.props.navigation.navigate('Signup') }} style={{ color: Colors.appBlue, fontSize: 14, lineHeight: 20, fontWeight: '700' }}> SIGN-UP</Text></Text>
                            </View>
                        </View>
                    </Content>
                </BackgroundImage>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSigninScreen);