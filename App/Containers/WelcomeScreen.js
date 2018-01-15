import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
// import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Text } from 'native-base';
import { Container, Content, Text, Button, Icon } from 'native-base';

class WelcomeScreen extends React.PureComponent {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexDirection: 'column',
                alignItems: 'center', paddingVertical: 120, paddingHorizontal: 0,
                justifyContent: 'space-between', backgroundColor: '#FBFBFB', flex: 1 }}>
                <View>
                    <Text style={{color: '#4B74FF', fontSize: 32, textAlign: 'center'}}>Welcome.</Text>
                    <Text style={{color: '#333333', fontSize: 32, textAlign: 'center'}}>Let's get started</Text>
                </View>

                <View style={{ width: 327 }}>
                    <Button block large onPress={ () => { this.props.navigation.navigate('Signup') }}
                    style={{ marginVertical: 30, backgroundColor: '#333333', height: 52}}>
                        <Text uppercase={false} 
                        style={{fontSize: 16, lineHeight: 20, fontFamily: 'Source Sans Pro'}}>Create an Account</Text>
                    </Button>
                    <Button block large style={{ backgroundColor: '#5082C3', height: 52}}>
                        <Text uppercase={false} 
                        style={{fontSize: 16, lineHeight: 20, fontFamily: 'Source Sans Pro'}}>Login with Email</Text>
                    </Button>
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

  export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);