import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        fontWeight: '500'
    },
    buttonFormInvalid : {
        backgroundColor: '#C6CBD4',
        height: 42,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonFormValid: {
        backgroundColor: '#1C58B5',
        height: 42,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center'
    }
});