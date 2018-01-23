import { StyleSheet } from 'react-native';

export const timeLineStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    row: {
      padding: 0,
      paddingLeft: 0
    },
    content: {
      marginLeft: 20,
    },
    timeline: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 40,
      justifyContent: 'center', // center the dot
      alignItems: 'center',
    },
    line: {
      position: 'absolute',
      top: 0,
      left: 18,
      width: 4,
      bottom: 0,
    },
    topLine: {
      flex: 1,
      width: 2,
      backgroundColor: '#A8A8A8',
    },
    bottomLine: {
      flex: 1,
      width: 2,
      backgroundColor: '#A8A8A8',
    },
    hiddenLine: {
      width: 0,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderColor: '#A8A8A8',
      borderWidth: 2
    },
  });
  