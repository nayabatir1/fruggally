import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../styles';
import {FONT_SIZE_24} from '../styles/typography';

function Name(): JSX.Element {
  return (
    <View>
      <Text style={styles.title}>frugally</Text>
    </View>
  );
}

// later change font to sassy frass

const styles = StyleSheet.create({
  title: {
    color: Colors.BLACK,
    fontSize: FONT_SIZE_24,
    ...Typography.FONT_BOLD,
  },
});

export default Name;
