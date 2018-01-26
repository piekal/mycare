import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20
  },

  themeColor: {
    color: Colors.appBlue
  },

  logoText: {
    color: '#1C58B5',
    fontSize: 38
  },

  boldText: {
    fontWeight: 'bold'
  },

  f18: {
    fontSize: 18,
    paddingBottom: 15
  },

  nxtBtn: {
    alignSelf: 'center',
    marginTop: 80,
    width: 150,
    justifyContent: 'center',
    backgroundColor: Colors.appBlue
  },

  skipBtn: {
    alignSelf: 'center',
    marginTop: 10,
    width: 150,
    justifyContent: 'center'
  },

  footerText: {
    color: '#333333',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 15
  }

})
