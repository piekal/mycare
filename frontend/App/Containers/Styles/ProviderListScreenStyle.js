import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors';

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
    color: Colors.appBlue
  },
  btnConnectedTxt: {
    color: '#FFFFFF'
  },
  btnFill: {
    backgroundColor: Colors.appBlue
  },
  btnOutline: {
    borderColor: Colors.appBlue
  }

})
