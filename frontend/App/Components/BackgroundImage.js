import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'native-base'
import styles from './Styles/BackgroundImageStyle'
import { Image } from 'react-native';
import Images from '../Themes/Images';
export default class BackgroundImage extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (
      <Image
        style={styles.container}
        source={Images.background}
      >
        {this.props.children}

      </Image>
    )
  }
}
