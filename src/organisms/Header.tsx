import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Colors, Mixins} from '../styles';

function Header(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={StyleSheet.flatten([styles.black, styles.title])}>
        fruggally
      </Text>

      <Text style={styles.black}>ICON</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Mixins.padding(20, 10),
    ...Mixins.boxShadow('#000000'),
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
  },
  black: {
    color: Colors.BLACK,
  },
});

export default memo(Header);
