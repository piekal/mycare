import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  item: {
    flexDirection: 'row',
       
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#3399CC',
    alignSelf: 'center',
    marginRight: 10
  },

  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 15,
    // alignSelf: 'flex-start'
  },
  time: {
    color: '#C5C6C7',
    fontSize: 10,
    // alignSelf: 'flex-end'
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:10,
    flex: 1 

  },
  excerpt: {
    fontSize: 12,
    color: '#333333'
  }
})
