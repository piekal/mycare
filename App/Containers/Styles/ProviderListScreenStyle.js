import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  font16: {
    fontSize: 16
  },
  bold: {
    fontWeight: '400'
  },
  btn: {
    height: 35,
    width: 135,
    borderColor: '#4B74FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#4B74FF'
  },
  btnConnectedTxt: {
    color: '#FFFFFF'
  }

})
