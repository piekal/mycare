import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    inputValid: {
        borderBottomColor: '#218EC4'
    },

    inputInvalid: {
        borderBottomColor: '#F25050'
    },

    labelValid: {
        color: '#218EC4',
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
        backgroundColor: '#218EC4',
        height: 42,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formItem: {
        marginLeft: 0,
        paddingLeft: 0
    }
});