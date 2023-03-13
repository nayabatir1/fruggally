import React from 'react';
import {StyleSheet, View} from 'react-native';

function Divider(): JSX.Element {
  return <View style={style.divider} />;
}

const style = StyleSheet.create({
  divider: {
    height: 10,
    width: 10,
  },
});

export default Divider;
