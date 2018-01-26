import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, BackHandler, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Icon } from 'native-base';
import SignupStyles from './Styles/SignupStyles';
import { Colors, Images } from '../Themes';
import * as axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import BackgroundImage from '../Components/BackgroundImage';

class SignupScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            hidePassword: true,
            firstNameDirty: false,
            lastNameDirty: false,
            passwordDirty: false,
            emailDirty: false,
            showSpinner: false
        };

        this.signup = this.signup.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        })
    }

    get firstNameIsValid() {
        return this.state.firstName.trim().length > 0;
    }

    get firstNameIsInvalid() {
        return this.state.firstName.trim().length < 1 && this.state.firstNameDirty;
    }

    get lastNameIsValid() {
        return this.state.lastName.trim().length > 0;
    }

    get lastNameIsInvalid() {
        return this.state.lastName.trim().length < 1 && this.state.lastNameDirty;
    }

    get passwordIsValid() {
        return this.state.password.trim().length > 5;
    }

    get passwordIsInvalid() {
        return !this.passwordIsValid && this.state.passwordDirty;
    }

    get emailIsvalid() {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(this.state.email.trim());
    }

    get emailIsInvalid() {
        return !this.emailIsvalid && this.state.emailDirty;
    }

    get formIsValid() {
        return this.emailIsvalid && this.firstNameIsValid && this.lastNameIsValid && this.passwordIsValid;
    }

    renderInvalidInputMsg(isEmail = false) {
        let msg = isEmail ? 'Please input a valid email for this field' : 'Please input a valid value for this field';

        return (
            <Item style={{ borderBottomColor: '#FBFBFB' }}>
                <Text style={{
                    color: '#F25050', fontSize: 11, lineHeight: 14,
                    textAlign: 'left'
                }}>
                    {msg}
                </Text>
            </Item>
        );
    }

    showFirstNameErrorMsg() {
        if (this.state.firstNameDirty && !this.firstNameIsValid) {
            return this.renderInvalidInputMsg();
        }
    }

    showLastNameErrorMsg() {
        if (this.state.lastNameDirty && !this.lastNameIsValid) {
            return this.renderInvalidInputMsg();
        }
    }

    showPasswordErrorMsg() {
        if (this.state.passwordDirty && !this.passwordIsValid) {
            return this.renderInvalidInputMsg();
        }
    }

    showEmailErrorMsg() {
        if (this.state.emailDirty && !this.emailIsvalid) {
            return this.renderInvalidInputMsg(true);
        }
    }

    signup() {
        let userDetails = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };

        this.setState({ showSpinner: true });

        axios.post('https://www.mycare-api.com/api/v1/user', userDetails)
            .then((response) => {
                if (response.data.userId) {
                    this.setState({ showSpinner: false });
                    this.props.navigation.navigate('Verification');
                }
            })
            .catch((err) => {
                this.setState({ showSpinner: false });
                console.log('registration failed with err');
                console.log(err);
            });
    }

    renderSignupForm() {
        return (
            <Form style={{ flex: 4 }}>

                <Item style={[SignupStyles.formItem, this.firstNameIsValid && SignupStyles.inputValid, this.firstNameIsInvalid && SignupStyles.inputInvalid]} stackedLabel>
                    <Label style={[SignupStyles.floatingLabel, this.firstNameIsValid && SignupStyles.labelValid,
                    this.firstNameIsInvalid && SignupStyles.labelInvalid]}>
                        Firstname
                    </Label>

                    <Input style={[this.state.firstName.length > 0 && SignupStyles.inputValid]} placeholder="John"
                        placeholderTextColor="#A8A8A8"
                        onChangeText={(text) => this.setState({ firstName: text, firstNameDirty: true })} value={this.state.firstName} />
                </Item>

                {this.showFirstNameErrorMsg()}

                <Item style={[SignupStyles.formItem, this.lastNameIsValid && SignupStyles.inputValid, this.lastNameIsInvalid && SignupStyles.inputInvalid]} stackedLabel>

                    <Label style={[SignupStyles.floatingLabel, this.lastNameIsValid && SignupStyles.labelValid,
                    this.lastNameIsInvalid && SignupStyles.labelInvalid]}>
                        LastName
                    </Label>
                    <Input placeholder="Doe" placeholderTextColor="#A8A8A8"
                        onChangeText={(text) => this.setState({ lastName: text, lastNameDirty: true })} value={this.state.lastName} />
                </Item>

                {this.showLastNameErrorMsg()}

                <Item style={[SignupStyles.formItem, this.emailIsvalid && SignupStyles.inputValid, this.emailIsInvalid && SignupStyles.inputInvalid]} stackedLabel>

                    <Label style={[SignupStyles.floatingLabel, this.emailIsvalid && SignupStyles.labelValid,
                    this.emailIsInvalid && SignupStyles.labelInvalid]}>
                        Email
                    </Label>
                    <Input placeholderTextColor="#A8A8A8"
                        placeholder="johndoe@example.com" onChangeText={(text) => this.setState({ email: text, emailDirty: true })} value={this.state.email} />
                </Item>
                {this.showEmailErrorMsg()}

                <Item style={[SignupStyles.formItem, this.passwordIsValid && SignupStyles.inputValid, this.passwordIsInvalid && SignupStyles.inputInvalid]} stackedLabel>

                    <Label style={[SignupStyles.floatingLabel, this.passwordIsValid && SignupStyles.labelValid,
                    this.passwordIsInvalid && SignupStyles.labelInvalid]}>
                        Password
                    </Label>

                    <Input placeholder="******" onChangeText={(text) => this.setState({ password: text, passwordDirty: true })}
                        placeholderTextColor="#A8A8A8" value={this.state.password} secureTextEntry={this.state.hidePassword} />

                </Item>
                {this.showPasswordErrorMsg()}
            </Form>
        );
    }

    renderContinueButton() {
        let formInvalidBtn = (<Button rounded iconRight style={[SignupStyles.buttonFormInvalid]}>
            <Text style={{ color: '#333333', fontSize: 16, lineHeight: 20, fontWeight: '600' }} uppercase={false}>Continue</Text>
            <Icon style={{ color: '#333333' }} name='ios-arrow-forward' />
        </Button>);

        let formValidBtn = (
            <Button rounded iconRight style={[SignupStyles.buttonFormValid]} onPress={this.signup}>
                <Text style={{ color: '#FBFBFB', fontSize: 16, lineHeight: 20 }} uppercase={false}>Continue</Text>
                <Icon name='ios-arrow-forward' />
            </Button>
        );

        let formBtn = this.formIsValid ? formValidBtn : formInvalidBtn;

        return (
            <Item style={{ alignItems: 'center', justifyContent: 'center', borderBottomColor: '#FBFBFB', flex: 2 }}>
                {formBtn}
            </Item>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FBFBFB' }}>

                <BackgroundImage>
                    <Content contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 28, paddingVertical: 40, justifyContent: 'space-between'
                    }}>
                        <Spinner visible={this.state.showSpinner} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

                        <View style={{ flex: 2 }}>
                            <Text style={{ color: Colors.appBlue, fontSize: 24, lineHeight: 32, textAlign: 'center' }}>
                                my<Text style={{ fontWeight: 'bold', color: Colors.appBlue, fontSize: 24, lineHeight: 32 }}>Care.</Text>
                            </Text>
                        </View>
                        {this.renderSignupForm()}

                        <View style={{ flex: 4, justifyContent: 'space-between', marginTop: 10 }}>
                            <Item style={{ alignItems: 'center', justifyContent: 'center', borderBottomColor: '#FBFBFB', flex: 0.5 }}>

                                {this.renderContinueButton()}

                            </Item>

                            <Item style={{ flex: 0.5, borderBottomColor: '#FBFBFB', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>
                                    Already have an Account? 
                                    <Text onPress={() => { this.props.navigation.navigate('EmailSignin') }} style={{ color: '#218EC4', fontSize: 14, lineHeight: 20, fontWeight: '700' }}> SIGN-IN
                                    </Text>
                                </Text>
                            </Item>

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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);