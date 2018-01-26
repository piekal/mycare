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
  listItem : {
    paddingTop: 0,
    paddingBottom: 0
  },
  textEmail: {

    fontSize: 16,
    fontWeight: '600',
    color: '#857F7F'
  },
  passText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#218EC4'
  },

  justifyCenter: {
    justifyContent: 'center'
  }
})
