import React from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Colors, Images } from '../Themes';
import { Container, Content, Text, Button, Icon } from 'native-base';
import BackgroundImage from '../Components/BackgroundImage';

class WelcomeScreen extends React.PureComponent {
    render() {
        return (
           
            <Container>

                <BackgroundImage>
                    
                    <Content contentContainerStyle={{
                        flexDirection: 'column',
                        alignItems: 'center', paddingVertical: 120, paddingHorizontal: 0,
                        justifyContent: 'space-between', flex: 1
                    }}>
                        <View>
                            <Text style={{ color: Colors.appBlue, fontSize: 32, lineHeight: 46, fontWeight: 'bold', textAlign: 'center' }}>Welcome.</Text>
                            <Text style={{ color: '#333333', fontSize: 32, textAlign: 'center' }}>Let's get started</Text>
                        </View>

                        <View style={{ padding: 24 }}>
                            <Button rounded block large onPress={() => { this.props.navigation.navigate('Signup') }}
                                style={{ width: 327, marginVertical: 30, backgroundColor: Colors.appBlue, height: 52 }}>
                                <Text uppercase={false}
                                    style={{ fontSize: 16, lineHeight: 20, fontFamily: 'Source Sans Pro', fontWeight: '700' }}>Create an Account</Text>
                            </Button>
                            <Button rounded bordered block large style={{ width: 327, height: 52, borderColor: '#11BC93' }} onPress={() => { this.props.navigation.navigate('EmailSignin') }}>
                                <Text uppercase={true}
                                    style={{ fontSize: 16, lineHeight: 20, fontFamily: 'Source Sans Pro', fontWeight: '700', color: '#11BC93' }}>SIGN IN</Text>
                            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);