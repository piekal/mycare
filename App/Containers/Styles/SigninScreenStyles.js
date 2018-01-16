import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    inputField : {
        alignItems: 'center',
        justifyContent: 'center',
        width: 237,
        alignSelf: 'center'
    },
    textInput: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    inputValid: {
        borderBottomColor: '#1C58B5'
    },

    inputInvalid: {
        borderBottomColor: '#F25050'
    },

    labelValid: {
        color: '#1C58B5',
    },

    labelInvalid: {
        color: '#F25050'
    },

    floatingLabel: {
        color: '#333333',
        fontSize: 16,
        lineHeight: 16,
        textAlign: 'center'
    },
    buttonFormInvalid : {
        backgroundColor: '#C6CBD4'
    },
    buttonFormValid: {
        backgroundColor: '#1C58B5'
    }
});