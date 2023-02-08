import React from 'react';
import {Image, StyleSheet} from 'react-native';

function Logo(): JSX.Element {
  return (
    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default Logo;
