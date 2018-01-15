import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Icon } from 'native-base';
import SignupStyles from './Styles/SignupStyles';

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
            emailDirty: false
        };
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
        let msg = isEmail ? 'Please input a valid email for this field' : 'Please input a valid email for this field';

        return (
            <Item style={{ borderBottomColor:'#FBFBFB' }}>
                <Text style={{ color: '#F25050', fontSize: 10, lineHeight: 13, 
                textAlign: 'left' }}>
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

    renderSignupForm() {
        return (
            <Form style={{ flex: 1 }}>
                <Item style={[this.firstNameIsValid && SignupStyles.inputValid, this.firstNameIsInvalid && SignupStyles.inputInvalid]} stackedLabel>
                    <Label style={[SignupStyles.floatingLabel, this.firstNameIsValid && SignupStyles.labelValid, 
                        this.firstNameIsInvalid && SignupStyles.labelInvalid]}>
                    Firstname</Label>
                    <Input style={[this.state.firstName.length > 0 && SignupStyles.inputValid]} placeholder="John"
                        onChangeText={(text) => this.setState({ firstName: text, firstNameDirty: true })} value={this.state.firstName} />
                </Item>
                {this.showFirstNameErrorMsg()}

                <Item style={[this.lastNameIsValid && SignupStyles.inputValid, this.lastNameIsInvalid && SignupStyles.inputInvalid]} stackedLabel>
                    <Label style={[SignupStyles.floatingLabel, this.lastNameIsValid && SignupStyles.labelValid,
                    this.lastNameIsInvalid && SignupStyles.labelInvalid]}>LastName</Label>
                    <Input placeholder="Doe"
                        onChangeText={(text) => this.setState({ lastName: text, lastNameDirty: true })} value={this.state.lastName} />
                </Item>
                {this.showLastNameErrorMsg()}

                <Item style={[this.emailIsvalid && SignupStyles.inputValid, this.emailIsInvalid && SignupStyles.inputInvalid]} stackedLabel>
                    <Label style={[SignupStyles.floatingLabel, this.emailIsvalid && SignupStyles.labelValid, 
                    this.emailIsInvalid && SignupStyles.labelInvalid]}>Email</Label>
                    <Input placeholder="johndoe@example.com" onChangeText={(text) => this.setState({ email: text, emailDirty: true })} value={this.state.email} />
                </Item>
                {this.showEmailErrorMsg()}

                <Item style={[this.passwordIsValid && SignupStyles.inputValid, this.passwordIsInvalid && SignupStyles.inputInvalid]} stackedLabel>
                    <Label style={[SignupStyles.floatingLabel, this.passwordIsValid && SignupStyles.labelValid, 
                    this.passwordIsInvalid && SignupStyles.labelInvalid]}>Password</Label>
                    <Input placeholder="******" onChangeText={(text) => this.setState({ password: text, passwordDirty: true })}
                        value={this.state.password} secureTextEntry={this.state.hidePassword} />
                    {/* <Icon active name='swap' /> */}
                </Item>
                {this.showPasswordErrorMsg()}
            </Form>
        );
    }

    renderContinueButton() {
        let formInvalidBtn = (<Button iconRight style={[SignupStyles.buttonFormInvalid]}>
            <Icon name='arrow-forward' />
            <Text style={{ color: '#333333', fontSize: 16, lineHeight: 20 }} uppercase={false}>Continue</Text>
        </Button>);

        let formValidBtn = (
            <Button iconRight>
                <Icon name='arrow-forward' />
                <Text uppercase={false}>Continue</Text>
            </Button>
        );

        let formBtn = this.formIsValid ? formValidBtn : formInvalidBtn;

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {formBtn}
            </View>
        );
    }

    render() {
        return (
            <Container >
                <Content contentContainerStyle={{ backgroundColor: '#FBFBFB' }} style={{ flex: 1}}>
                    {this.renderSignupForm()}
                    {this.renderContinueButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);