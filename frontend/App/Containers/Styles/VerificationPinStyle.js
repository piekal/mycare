import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20
  },
  themeColor: {
    color:Colors.appBlue
  },

  logoText: {
    color: '#1C58B5',
    fontSize: 38
  },

  boldText: {
    fontWeight: 'bold'
  },

  verifyBtn: {
    alignSelf: 'center',
    marginTop: 80,
    width: 150,
    justifyContent: 'center',
    backgroundColor: Colors.appBlue
  }
})
