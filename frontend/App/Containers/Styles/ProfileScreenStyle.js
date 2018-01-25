import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  profileImage: {
    height: 150,
    width: null,
    flex: 1
  },
  textLabel: {

    fontSize: 14,
    letterSpacing: 0.05,
    color: '#333333'
  },
  textValue: {

    fontSize: 16,
    fontWeight: '600',
    color: '#333333'
  },
  font14: {
    fontSize: 14
  },
  btn: {
    height: 52,
    width: 325,
    alignSelf: 'center',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  btnOutline: {
    borderColor: '#4B74FF',
  },

  outlineBtnText: {
    color: '#4B74FF',
  }
})
