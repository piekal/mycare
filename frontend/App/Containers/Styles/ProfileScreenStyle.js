import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

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
    alignItems: 'center',
  },
  btnFill : {
    backgroundColor: Colors.appBlue
  },

  btnOutline: {
    borderColor: Colors.appBlue,
  },

  outlineBtnText: {
    color: Colors.appBlue,
  },

  dialogContentView: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    justifyContent: 'center'
  },

  dialogTitle: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent'
  },
  dialogTitleText: {
    color: '#333333',
    fontWeight: '700'
  },
  dialogBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end' 
  }

})
