import React from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import { Images, Metrics, Colors } from "../Themes";
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Icon, Thumbnail, Left } from 'native-base';
import SigninScreenStyles from './Styles/SigninScreenStyles';

class PasswordSigninScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordDirty: false,
            user: { fullName: 'Larry Jones'}
        };
    }

    get passwordIsValid() {
        return this.state.password.trim().length > 5;
    }

    get passwordIsInvalid() {
        return !this.passwordIsValid && this.state.passwordDirty;
    }

    get formIsValid() {
        return this.passwordIsValid;
    }

    showpasswordErrorMsg() {
        if (this.state.passwordDirty && !this.passwordIsValid) {
            return (
                <Item style={{ borderBottomColor: '#FBFBFB', alignSelf: 'center' }}>
                    <Text style={{
                        color: '#F25050', fontSize: 11, lineHeight: 14,
                        textAlign: 'center'
                    }}>
                        Password doesnt match
                    </Text>
                </Item>
            );
        }
    }

    renderpasswordForm() {
        return (
            <View style={{ flex: 6, justifyContent: 'space-between', paddingVertical: 70 }}>
                <View style={[{ alignItems: 'center' }]}>
                    <Thumbnail large source={Images.ignite} />
                    <Text uppercase={true} style={{fontSize: 10.5, lineHeight: 16}}>{this.state.user.fullName}</Text>
                </View>
                <Item style={[SigninScreenStyles.inputField, this.passwordIsValid && SigninScreenStyles.inputValid, this.passwordIsInvalid && SigninScreenStyles.inputInvalid]} stackedLabel>
                    <Label style={[SigninScreenStyles.floatingLabel, this.passwordIsValid && SigninScreenStyles.labelValid,
                    this.passwordIsInvalid && SigninScreenStyles.labelInvalid, { alignSelf: 'center' }]}>Password</Label>
                    <Input placeholderTextColor="#A8A8A8" style={[SigninScreenStyles.textInput]}
                        placeholder="******" onChangeText={(text) => this.setState({ password: text, passwordDirty: true })} value={this.state.password} />
                </Item>
                {this.showpasswordErrorMsg()}
            </View>
        );
    }

    renderSigninButton() {
        let formInvalidBtn = (<Button rounded iconRight style={[SigninScreenStyles.button, SigninScreenStyles.buttonFormInvalid]}>
            {/* <Icon name='arrow-forward' /> */}
            <Text style={[SigninScreenStyles.submitBtnText, { color: '#333333' }]} uppercase={true}>Sign-In</Text>
        </Button>);

        let formValidBtn = (
            <Button rounded iconRight style={[SigninScreenStyles.button, SigninScreenStyles.buttonFormValid]}>
                {/* <Icon name='arrow-forward' /> */}
                <Text style={{ color: '#FBFBFB', fontSize: 16, lineHeight: 20 }} uppercase={true}>Signin</Text>
            </Button>
        );

        return this.formIsValid ? formValidBtn : formInvalidBtn;
    }

    render() {
        return (
            <Container >
                <Content contentContainerStyle={{
                    backgroundColor: '#FBFBFB', flexGrow: 1,
                    paddingHorizontal: 10, paddingVertical: 60, justifyContent: 'space-between'
                }}>
                    <View style={{ flex: 1.5 }}>
                        {/* <Left><Icon name="arrow-back" /></Left> */}
                        <Text style={{ color: "blue", fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>myCare</Text>
                    </View>
                    {this.renderpasswordForm()}

                    <View style={{ flex: 2.5, justifyContent: 'space-between' }}>
                        <Item style={{ alignItems: 'center', justifyContent: 'center', borderBottomColor: '#FBFBFB', flex: 0.5 }}>
                        {this.renderSigninButton()}
                        </Item>
                        
                        <View style={{ flex: 0.5, marginTop: 15, borderBottomColor: '#FBFBFB', alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Dont have an Account?
                            <Text onPress={() => { this.props.navigation.navigate('Signup') }} style={{ color: '#1C58B5', fontSize: 14, lineHeight: 20 }}> SIGN-UP</Text></Text>
                        </View>
                    </View>
                </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSigninScreen);